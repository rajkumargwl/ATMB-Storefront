const { createClient } = require('@sanity/client')
const axios = require('axios')
const { parse, HTMLElement, TextNode, Node } = require('node-html-parser')
const fs = require('fs')
const path = require('path')
const https = require('https')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '15agngtk',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
  apiVersion: '2025-09-17',
})

const WP_API = process.env.WP_API_URL
const WP_MEDIA_API = process.env.WP_MEDIA_API_URL
if (!WP_API || !WP_MEDIA_API) {
  console.log(WP_API,"WP_API");
  throw new Error('WP_API_URL or WP_MEDIA_API_URL is not set in .env')
}

const PER_PAGE = 100

// HELPER FUNCTIONS 
async function downloadImage(url: string, filename: string) {
  const file = fs.createWriteStream(filename)
  return new Promise<void>((resolve, reject) => {
    https.get(url, (response: import('http').IncomingMessage) => {
      response.pipe(file)
      file.on('finish', () =>
        file.close((err: NodeJS.ErrnoException | null) => (err ? reject(err) : resolve()))
      )
    }).on('error', reject)
  })
}

async function uploadImageToSanity(url: string) {
  if (!url) return null; 

  const tempFile = path.join('./', path.basename(url));

  try {
   
    await downloadImage(url, tempFile);

    // Check if file is empty
    const stats = fs.statSync(tempFile);
    if (stats.size === 0) {
      console.warn(`Skipped empty image: ${url}`);
      fs.unlinkSync(tempFile);
      return null;
    }

    // Upload to Sanity
    const asset = await client.assets.upload('image', fs.createReadStream(tempFile));
    fs.unlinkSync(tempFile);
    return { _type: 'image', asset: { _ref: asset._id, _type: 'reference' } };
  } catch (err: unknown) {
    console.error(`Skipped invalid image: ${url}`, err);
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    return null; // skip this image
  }
}

function isHTMLElement(node: Node): node is HTMLElement {
  return (node as HTMLElement).tagName !== undefined
}

function isTextNode(node: Node): node is Node & { text: string } {
  return 'text' in node && typeof (node as any).text === 'string'
}

// HTML TO BLOCKS 
async function htmlNodeToBlocks(node: Node): Promise<any[]> {
  const blocks: any[] = []

  if (isHTMLElement(node)) {
    // IMAGE NODE
    if (node.tagName === 'IMG') {
      const img = await uploadImageToSanity(node.getAttribute('src') || '')
      blocks.push(img)
    }
    // TEXT/HEADING/LIST NODE
    else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI'].includes(node.tagName)) {
      blocks.push({
        _type: 'block',
        style: node.tagName === 'LI' ? 'normal' : node.tagName.toLowerCase(),
        children: [{ _type: 'span', text: (node.textContent || '').trim() }],
      })
    }

    // CHILD NODES
    for (const child of node.childNodes) {
      blocks.push(...(await htmlNodeToBlocks(child)))
    }
  }
  // TEXT NODE
  else if (isTextNode(node) && node.text.trim()) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: node.text.trim() }],
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

// FETCH ALL POSTS WITH PAGINATION 
async function fetchAllPosts() {
  let page = 1
  let allPosts: any[] = []
  let totalPages = 1

  do {
    const response = await axios.get(WP_API, { params: { per_page: PER_PAGE, page } })
    allPosts.push(...response.data)

    if (page === 1) {
      totalPages = parseInt(response.headers['x-wp-totalpages'], 10)
    }

    console.log(`Fetched page ${page} of ${totalPages}`)
    page++
  } while (page <= totalPages)

  console.log(`Total posts fetched: ${allPosts.length}`)
  return allPosts
}

// FETCH FEATURED IMAGE 
async function fetchFeaturedImage(post: any) {
  if (post.featured_media) {
    try {
      const { data } = await axios.get(`${WP_MEDIA_API}${post.featured_media}`)
      return await uploadImageToSanity(data.source_url)
    } catch (err: unknown) {
      console.error('Error fetching featured image for post:', post.id, err)
    }
  }
  return null
}

//  IMPORT POSTS INTO SANITY 
async function importPosts() {
  const posts = await fetchAllPosts()

  for (const post of posts) {
    
    const mainImage = await fetchFeaturedImage(post)
    const authorName = post.author_name || (post.author_info?.display_name) || null;

   
    const doc = {
      _id: `wpPost-${post.slug}`,
      _type: 'wpPost',
      title: post.title.rendered,
      slug: { _type: 'slug', current: post.slug },
      content: post.content.rendered.replace(/<[^>]*>/g, ''), // strip HTML
      date: post.date,
      link: post.link,
      mainImage
    }
    

    try {
     // await client.create(doc)
     await client.createOrReplace(doc)
      console.log(`Imported/updated: ${post.title.rendered}`)
    } catch (err: unknown) {
      console.error('Error importing:', post.title.rendered, err)
    }
  }
}


importPosts()
