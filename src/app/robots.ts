import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next', '/api/*'],
    },
    sitemap: 'https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app/sitemap.xml',
  }
} 