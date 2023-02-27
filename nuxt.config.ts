// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";
import getSitemapList from './api/utils/sitemapGenerator'

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  builder: 'webpack',
  nitro: {
    devProxy: {
      '/api/': {
        target: process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'https://www.istrameddiagnostika.ru',
        changeOrigin: true
      }
    }
  },
  app: {
    head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "name": "og:title",
          "content": 'Медицинский центр Диагностика и лечение в Истре, Анализы Invitro, 3D/4D УЗИ в Истре, цены '
        },
        {
          "name": "og:description",
          "content": 'Медицинский центр Диагностика и лечение в Истре, Анализы Invitro, 3D/4D УЗИ в Истре, цены '
        },
        {
          "charset": "utf-8"
        }
      ]
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  css: [
    '@/assets/styles/normalize.min.css',
    '@/assets/styles/_variables.scss',
    '@/assets/styles/main.scss',
    '@/assets/styles/_media.scss',
  ],
  runtimeConfig: {
    siteUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.istrameddiagnostika.ru',
    siteName: 'Медицинский центр "Диагностика и лечение" в городе Истра',
    siteDescription: 'Мы предлагаем комплексные медицинские услуги своим пациентам. Наши высококвалифицированные специалисты из ведущих клиник и институтов г. Москвы (высшей, 1-ой категории, кандидаты и доктора медицинских наук) используют самые современные технологии и методы для диагностики и лечения заболеваний.',
    language: 'ru'
  },
  modules: [
    ['@pinia/nuxt', {autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],}],
    ['nuxt-icon'],
    ['nuxt-simple-sitemap'], ['nuxt-simple-robots']
  ],
  robots: {
    disallow: ['/login', '/admin', '/*?*', '/*%'],
    sitemap: '/sitemap.xml'
  },
  sitemap: {
    hostname: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.istrameddiagnostika.ru',
    exclude: ['/admin/!**', '/login'],
    gzip: true,
    urls: async () => {
      const generateList = await getSitemapList()
      return generateList.map((page) => ({
        url: page,
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date()
      }))
    }
  },
  routeRules: {
    '/admin/**': {index: false},
    '/**': {sitemap: {changefreq: 'daily', priority: 1, lastmod: `${new Date()}`}}
  },
  nuxtIcon: {
    size: '24px'
  }
})
