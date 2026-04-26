import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://luskicollection.com/sitemap.xml',
    host: 'https://luskicollection.com',
  }
}
