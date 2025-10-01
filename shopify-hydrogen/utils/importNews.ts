import { createClient } from '@sanity/client'
import axios from 'axios'
import { parse } from 'node-html-parser'
import fs from 'fs'
import path from 'path'
import https from 'https'
import dotenv from 'dotenv'

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

// --- Helpers ---
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
    return { _type: 'image', asset: { _ref: asset._id, _type: 'reference' } }
  } catch (err) {
    console.error(`Skipped invalid image: ${url}`, err)
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile)
    return null
  }
}

// --- Fetch news with pagination ---
async function fetchAllNews(): Promise<any[]> {
  let page = 1
  const allNews: any[] = []
  let totalPages = 1

  do {
    const response = await axios.get(WP_NEWS_API!, { params: { per_page: PER_PAGE, page } })
    allNews.push(...response.data)

    if (page === 1) {
      totalPages = parseInt(response.headers['x-wp-totalpages'], 10)
    }

    console.log(`Fetched news page ${page} of ${totalPages}`)
    page++
  } while (page <= totalPages)

  console.log(`Total news fetched: ${allNews.length}`)
  return allNews
}

// --- Featured image ---
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

// --- Organization Logo ---
async function fetchOrganizationLogo(item: any) {
  try {
    const logoUrl =
      item.yoast_head_json?.schema?.['@graph']?.find(
        (node: any) => node['@type'] === 'Organization'
      )?.logo?.url

    if (logoUrl) {
      return await uploadImageToSanity(logoUrl)
    }
  } catch (err) {
    console.error('Error fetching organization logo for news:', item.id, err)
  }
  return null
}


async function importNews() {
  const newsItems = await fetchAllNews()

  const orgLogoUrl = 'https://www.anytimemailbox.com/wp-content/uploads/2023/09/public-atmb-logo-white.png'
  const logoImage = await uploadImageToSanity(orgLogoUrl)

  for (const item of newsItems) {
    const mainImage = await fetchFeaturedImage(item)

    const doc: any = {
      _id: `news-${item.slug}`,
      _type: 'news',
      title: item.title.rendered,
      slug: { _type: 'slug', current: item.slug },
      description: item.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
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


importNews()
