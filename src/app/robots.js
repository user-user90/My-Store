export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio', // يمنع جوجل من أرشفة لوحة تحكم سانيتي
    },
    sitemap: 'https://vantix-store.vercel.app/sitemap.xml',
  }
}