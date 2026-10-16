// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  site: {
    url: 'https://aydinox.com.tr',
    name: 'Aydınox'
  },

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/sss': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/robots.txt': { prerender: true },
    '/hakkimizda': { redirect: '/kurumsal/hakkimizda' },
    '/en/urunler': { redirect: { to: '/en/products', statusCode: 301 } },
    '/en/urunler/**': { redirect: { to: '/en/products/**', statusCode: 301 } },
    '/en/hizmetler': { redirect: { to: '/en/services', statusCode: 301 } },
    '/en/hizmetler/**': { redirect: { to: '/en/services/**', statusCode: 301 } },
    '/en/iletisim': { redirect: { to: '/en/contact', statusCode: 301 } },
    '/en/galeri': { redirect: { to: '/en/gallery', statusCode: 301 } },
    '/en/kurumsal/**': { redirect: { to: '/en/corporate/**', statusCode: 301 } },
    '/en/teklif-al': { redirect: { to: '/en/get-a-quote', statusCode: 301 } },
    '/en/sss': { redirect: { to: '/en/faq', statusCode: 301 } },
    '/en/ara': { redirect: { to: '/en/search', statusCode: 301 } },
    '/ar/urunler': { redirect: { to: '/ar/products', statusCode: 301 } },
    '/ar/urunler/**': { redirect: { to: '/ar/products/**', statusCode: 301 } },
    '/ar/hizmetler': { redirect: { to: '/ar/services', statusCode: 301 } },
    '/ar/hizmetler/**': { redirect: { to: '/ar/services/**', statusCode: 301 } },
    '/ar/iletisim': { redirect: { to: '/ar/contact', statusCode: 301 } },
    '/ar/galeri': { redirect: { to: '/ar/gallery', statusCode: 301 } },
    '/ar/kurumsal/**': { redirect: { to: '/ar/corporate/**', statusCode: 301 } },
    '/ar/teklif-al': { redirect: { to: '/ar/get-a-quote', statusCode: 301 } },
    '/ar/sss': { redirect: { to: '/ar/faq', statusCode: 301 } },
    '/ar/ara': { redirect: { to: '/ar/search', statusCode: 301 } }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'tr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: {
      'urunler': {
        tr: '/urunler',
        en: '/products',
        ar: '/products'
      },
      'urunler-kategori': {
        tr: '/urunler/[kategori]',
        en: '/products/[kategori]',
        ar: '/products/[kategori]'
      },
      'urunler-kategori-slug': {
        tr: '/urunler/[kategori]/[slug]',
        en: '/products/[kategori]/[slug]',
        ar: '/products/[kategori]/[slug]'
      },
      'hizmetler': {
        tr: '/hizmetler',
        en: '/services',
        ar: '/services'
      },
      'hizmetler-slug': {
        tr: '/hizmetler/[slug]',
        en: '/services/[slug]',
        ar: '/services/[slug]'
      },
      'iletisim': {
        tr: '/iletisim',
        en: '/contact',
        ar: '/contact'
      },
      'galeri': {
        tr: '/galeri',
        en: '/gallery',
        ar: '/gallery'
      },
      'blog': {
        tr: '/blog',
        en: '/blog',
        ar: '/blog'
      },
      'blog-slug': {
        tr: '/blog/[slug]',
        en: '/blog/[slug]',
        ar: '/blog/[slug]'
      },
      'kurumsal-slug': {
        tr: '/kurumsal/[slug]',
        en: '/corporate/[slug]',
        ar: '/corporate/[slug]'
      },
      'sss': {
        tr: '/sss',
        en: '/faq',
        ar: '/faq'
      },
      'teklif-al': {
        tr: '/teklif-al',
        en: '/get-a-quote',
        ar: '/get-a-quote'
      },
      'ara': {
        tr: '/ara',
        en: '/search',
        ar: '/search'
      }
    },
    locales: [
      {
        code: 'tr',
        language: 'tr-TR',
        name: 'Türkçe',
        files: ['tr/ui.json', 'tr/content.json']
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        files: ['en/ui.json', 'en/content.json']
      },
      {
        code: 'ar',
        language: 'ar-SA',
        name: 'العربية',
        dir: 'rtl',
        files: ['ar/ui.json', 'ar/content.json']
      }
    ]
  },

  icon: {
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      sizeLimitKb: 512
    }
  }
})
