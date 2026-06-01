import { MetadataRoute } from 'next'

const base = 'https://www.harmonizedtherapies.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/the-quiet-holders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/oracle-cards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/retreats`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
