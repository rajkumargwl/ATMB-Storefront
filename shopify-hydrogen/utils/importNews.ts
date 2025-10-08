import { createClient } from '@sanity/client'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import https from 'https'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { parse, HTMLElement, Node } from 'node-html-parser'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'yourProjectId',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
  apiVersion: '2025-09-17',
})

const WP_NEWS_API = process.env.WP_NEWS_API_URL
const WP_MEDIA_API = process.env.WP_MEDIA_API_URL
const PER_PAGE = 100

if (!WP_NEWS_API || !WP_MEDIA_API) {
  throw new Error('WP_NEWS_API_URL or WP_MEDIA_API_URL is not set in .env')
}

// --------------------- Helpers ---------------------
async function downloadImage(url: string, filename: string): Promise<void> {
  const file = fs.createWriteStream(filename)
  return new Promise<void>((resolve, reject) => {
    https.get(url, (response: any) => {
      response.pipe(file)
      file.on('finish', () => file.close((err: any) => (err ? reject(err) : resolve())))
    }).on('error', reject)
  })
}

async function uploadImageToSanity(url?: string | null) {
  if (!url) return null
  const tempFile = path.join('./', path.basename(url))

  try {
    await downloadImage(url, tempFile)
    const stats = fs.statSync(tempFile)
    if (stats.size === 0) {
      fs.unlinkSync(tempFile)
      return null
    }
    const asset = await client.assets.upload('image', fs.createReadStream(tempFile))
    fs.unlinkSync(tempFile)
    return { _type: 'image', _key: nanoid(), asset: { _ref: asset._id, _type: 'reference' } }
  } catch (err) {
    console.error(`Skipped invalid image: ${url}`, err)
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile)
    return null
  }
}

// --------------------- HTML to Portable Text ---------------------
function isHTMLElement(node: Node): node is HTMLElement {
  return (node as HTMLElement).tagName !== undefined
}

function isTextNode(node: Node): node is Node & { text: string } {
  return 'text' in node && typeof (node as any).text === 'string'
}

async function collectInlineNodes(node: Node): Promise<any[]> {
  const children: any[] = []

  for (const child of node.childNodes) {
    if (isHTMLElement(child)) {
      const tag = child.tagName.toUpperCase()
      const marks: string[] = []

      if (['STRONG', 'B'].includes(tag)) marks.push('strong')
      if (['EM', 'I'].includes(tag)) marks.push('em')

      if (tag === 'A') {
        const href = child.getAttribute('href')
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          const markId = nanoid()
          const nestedChildren = await collectInlineNodes(child)
          nestedChildren.forEach(c => c.marks = [...c.marks, markId])
          children.push(...nestedChildren)
          children.push({ _key: markId, _type: 'link', href })
        } else {
          // treat as plain text if not external link
          const nestedChildren = await collectInlineNodes(child)
          children.push(...nestedChildren)
        }
        continue
      }

      const nestedChildren = await collectInlineNodes(child)
      nestedChildren.forEach(c => c.marks = [...marks, ...(c.marks || [])])
      children.push(...nestedChildren)
    } else if (isTextNode(child) && child.text.trim()) {
      children.push({ _key: nanoid(), _type: 'span', text: child.text.trim(), marks: [] })
    }
  }

  return children
}

async function htmlNodeToBlocks(node: Node): Promise<any[]> {
  const blocks: any[] = []

  if (isHTMLElement(node)) {
    const tag = node.tagName.toUpperCase()

    if (tag === 'IMG') {
      const img = await uploadImageToSanity(node.getAttribute('src') || '')
      if (img) blocks.push(img)
    } else if (['H1','H2','H3','H4','H5','H6','P','LI','BLOCKQUOTE'].includes(tag)) {
      const children = await collectInlineNodes(node)
      if (children.length > 0) {
        blocks.push({
          _key: nanoid(),
          _type: 'block',
          style: tag === 'LI' ? 'normal' : tag.toLowerCase(),
          children
        })
      }
    } else {
      for (const child of node.childNodes) {
        blocks.push(...(await htmlNodeToBlocks(child)))
      }
    }
  } else if (isTextNode(node) && node.text.trim()) {
    blocks.push({
      _key: nanoid(),
      _type: 'block',
      style: 'normal',
      children: [{ _key: nanoid(), _type: 'span', text: node.text.trim(), marks: [] }]
    })
  }

  return blocks
}

async function htmlToPortableText(html: string): Promise<any[]> {
  const root = parse(html)
  const blocks: any[] = []
  for (const node of root.childNodes) {
    blocks.push(...(await htmlNodeToBlocks(node)))
  }
  return blocks
}

// --------------------- Fetch News ---------------------
async function fetchAllNews(): Promise<any[]> {
  let page = 1
  const allNews: any[] = []
  let totalPages = 1

  do {
    const response = await axios.get(WP_NEWS_API!, { params: { per_page: PER_PAGE, page } })
    allNews.push(...response.data)

    if (page === 1) totalPages = parseInt(response.headers['x-wp-totalpages'], 10)
    console.log(`Fetched news page ${page} of ${totalPages}`)
    page++
  } while (page <= totalPages)

  console.log(`Total news fetched: ${allNews.length}`)
  return allNews
}

// --------------------- Featured Image ---------------------
async function fetchFeaturedImage(item: any) {
  if (item.featured_media) {
    try {
      const { data } = await axios.get(`${WP_MEDIA_API}${item.featured_media}`)
      return await uploadImageToSanity(data.source_url)
    } catch (err) {
      console.error('Error fetching featured image for news:', item.id, err)
    }
  }
  return null
}

// --------------------- Import News ---------------------
async function importNews() {
  const newsItems = await fetchAllNews()
  const orgLogoUrl = 'https://www.anytimemailbox.com/wp-content/uploads/2023/09/public-atmb-logo-white.png'
  const logoImage = await uploadImageToSanity(orgLogoUrl)

  for (const item of newsItems) {
    const mainImage = await fetchFeaturedImage(item)
    const description = await htmlToPortableText(item.content.rendered)

    const doc: any = {
      _id: `news-${item.slug}`,
      _type: 'news',
      title: item.title.rendered,
      slug: { _type: 'slug', current: item.slug },
      description, 
      date: item.date,
    }

    if (mainImage) doc.featuredImage = mainImage
    if (logoImage) doc.logoImage = logoImage

    try {
      await client.createOrReplace(doc)
      console.log(`Imported/updated news: ${item.title.rendered}`)
    } catch (err) {
      console.error('Error importing news:', item.title.rendered, err)
    }
  }
}

// --------------------- Run ---------------------
importNews()
