import { createClient } from '@sanity/client'
import axios from 'axios'
import { Node, HTMLElement, TextNode, parse } from 'node-html-parser'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { nanoid } from 'nanoid'

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'm5xb8z9y',
  dataset: process.env.SANITY_DATASET || 'development',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
  apiVersion: '2025-09-17',
})

const WP_API = process.env.WP_API_URL
const WP_MEDIA_API = process.env.WP_MEDIA_API_URL
const PER_PAGE = 100

interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  date: string
  link: string
  featured_media: number
  categories?: number[]
  author_name?: string
  author_info?: { display_name?: string }
}

interface SanityImage {
  _type: 'image'
  asset: { _type: 'reference'; _ref: string }
}

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: string
  children: PortableTextSpan[]
  markDefs: any[]
}

interface PortableTextImage {
  _type: 'image'
  _key: string
  asset: { _type: 'reference'; _ref: string }
}

type PortableText = PortableTextBlock | PortableTextImage

// Helper Functions 
export async function downloadImage(url: string, filename: string): Promise<void> {
  const file = fs.createWriteStream(filename)

  return new Promise<void>((resolve, reject) => {
    https.get(url, (response: http.IncomingMessage) => {
      response.pipe(file)

      file.on('finish', () => {
        file.close((err?: NodeJS.ErrnoException | null) => { // ✅ optional err
          if (err) reject(err)
          else resolve()
        })
      })
    }).on('error', (err: Error) => reject(err))
  })
}


export async function uploadImageToSanity(url: string): Promise<PortableTextImage | null> {
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

    return {
      _type: 'image',
      _key: nanoid(),
      asset: { _ref: asset._id, _type: 'reference' },
    }
  } catch (err) {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile)
    console.error(`Skipped invalid image: ${url}`, err)
    return null
  }
}

function isHTMLElement(node: Node): node is HTMLElement {
  return (node as HTMLElement).tagName !== undefined
}

function isTextNode(node: Node): node is TextNode {
  return typeof (node as TextNode).text === 'string'
}

async function htmlNodeToBlocks(node: Node): Promise<PortableText[]> {
  const blocks: PortableText[] = []

  const nodeToSpan = (n: Node): PortableTextSpan[] => {
    if (isTextNode(n) && n.text.trim()) {
      const marks: string[] = []

      if (n.parentNode && isHTMLElement(n.parentNode)) {
        const tag = n.parentNode.tagName
        if (tag === 'STRONG' || tag === 'B') marks.push('strong')
        if (tag === 'EM' || tag === 'I') marks.push('em')
        if (tag === 'U') marks.push('underline')
        if (tag === 'CODE') marks.push('code')
        if (tag === 'A' && n.parentNode.getAttribute('href')) marks.push(nanoid())
      }

      return [{
        _type: 'span',
        _key: nanoid(),
        text: n.text.trim(),
        marks
      }]
    }
    return []
  }

  if (isHTMLElement(node)) {
    // Handle images
    if (node.tagName === 'IMG') {
      const img = await uploadImageToSanity(node.getAttribute('src') || '')
      if (img) blocks.push(img)
    }
    else if (['H1','H2','H3','H4','H5','H6','P','LI'].includes(node.tagName)) {
      const children: PortableTextSpan[] = node.childNodes.flatMap(nodeToSpan)
      if (children.length > 0) {
        blocks.push({
          _type: 'block',
          _key: nanoid(),
          style: node.tagName === 'LI' ? 'normal' : node.tagName.toLowerCase(),
          children,
          markDefs: node.tagName === 'A' ? [{
            _key: nanoid(),
            _type: 'link',
            href: node.getAttribute('href')
          }] : [],
        })
      }
    }
    else {
      for (const child of node.childNodes) {
        blocks.push(...(await htmlNodeToBlocks(child)))
      }
    }
  } else if (isTextNode(node)) {
    const spans = nodeToSpan(node)
    if (spans.length > 0) {
      blocks.push({
        _type: 'block',
        _key: nanoid(),
        style: 'normal',
        children: spans,
        markDefs: [],
      })
    }
  }

  return blocks
}

async function htmlToPortableText(html: string): Promise<PortableText[]> {
  const root = parse(html)
  const blocks: PortableText[] = []
  for (const child of root.childNodes) {
    blocks.push(...(await htmlNodeToBlocks(child)))
  }
  return blocks
}

async function fetchAllPosts(): Promise<WPPost[]> {
  let page = 1
  const allPosts: WPPost[] = []
  let totalPages = 1

  if (!WP_API) {
    throw new Error('WP_API is not defined')
  }

  do {
    const response = await axios.get<WPPost[]>(WP_API, { params: { per_page: PER_PAGE, page } })
    const posts: WPPost[] = response.data || []
    allPosts.push(...posts)

    if (page === 1) {
      totalPages = parseInt(response.headers['x-wp-totalpages'] || '1', 10)
    }

    console.log(`Fetched page ${page} of ${totalPages}`)
    page++
  } while (page <= totalPages)

  return allPosts
}
async function fetchFeaturedImage(post: WPPost): Promise<PortableTextImage | null> {
  if (post.featured_media) {
    try {
      const { data } = await axios.get<{ source_url: string }>(`${WP_MEDIA_API}${post.featured_media}`)
      return await uploadImageToSanity(data.source_url)
    } catch (err) {
      console.error('Error fetching featured image for post:', post.id, err)
    }
  }
  return null
}
async function importPosts(): Promise<void> {
  const posts = await fetchAllPosts()

  for (const post of posts) {
    const mainImage = await fetchFeaturedImage(post)
    const authorName = post.author_name || post.author_info?.display_name || null
    const portableContent = await htmlToPortableText(post.content.rendered)

    const doc = {
      _id: `wpPost-${post.slug}`,
      _type: 'wpPost',
      title: post.title.rendered,
      slug: { _type: 'slug', current: post.slug },
      content: portableContent,
      date: post.date,
      link: post.link,
      mainImage,
      authorName,
      categories: post.categories || [],
    }
    try {
      await client.createOrReplace(doc)
      console.log(`Imported/updated: ${post.title.rendered}`)
    } catch (err) {
      console.error('Error importing:', post.title.rendered, err)
    }
  }
}

importPosts()
