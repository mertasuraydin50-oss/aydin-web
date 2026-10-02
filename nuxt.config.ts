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
    '/en/ara': { redirect: { to: '/en/search', statusCode: 301 } }
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
        en: '/products'
      },
      'urunler-kategori': {
        tr: '/urunler/[kategori]',
        en: '/products/[kategori]'
      },
      'urunler-kategori-slug': {
        tr: '/urunler/[kategori]/[slug]',
        en: '/products/[kategori]/[slug]'
      },
      'hizmetler': {
        tr: '/hizmetler',
        en: '/services'
      },
      'hizmetler-slug': {
        tr: '/hizmetler/[slug]',
        en: '/services/[slug]'
      },
      'iletisim': {
        tr: '/iletisim',
        en: '/contact'
      },
      'galeri': {
        tr: '/galeri',
        en: '/gallery'
      },
      'blog': {
        tr: '/blog',
        en: '/blog'
      },
      'blog-slug': {
        tr: '/blog/[slug]',
        en: '/blog/[slug]'
      },
      'kurumsal-slug': {
        tr: '/kurumsal/[slug]',
        en: '/corporate/[slug]'
      },
      'sss': {
        tr: '/sss',
        en: '/faq'
      },
      'teklif-al': {
        tr: '/teklif-al',
        en: '/get-a-quote'
      },
      'ara': {
        tr: '/ara',
        en: '/search'
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
