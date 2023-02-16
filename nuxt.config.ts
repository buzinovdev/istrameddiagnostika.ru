// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  builder: 'webpack',
  nitro: {
    devProxy: {
      '/api/': {
        target: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://www.istrameddiagnostika.ru/',
        changeOrigin: true
      }
    },
  },
  app: {
    head: {
      "title": 'Анализы | ООО "Диагностика и лечение" | Истра',
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "name": "description",
          "content": 'Медицинский центр Диагностика и лечение в Истре, Анализы Invitro, 3D/4D УЗИ в Истре, цены '
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
      ],
      "link": [],
      "style": [],
      "script": [],
      "noscript": []
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  css: [
    '@/assets/styles/normalize.min.css',
    '@/assets/styles/_variables.scss',
    '@/assets/styles/main.scss',
    '@/assets/styles/_media.scss',
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ],
      }
    ],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/admin',
      BlankLine: true,
      Comment: 'Comment here',
      Sitemap: (req) => `https://localhost:3000/sitemap.xml`
    }],
    ['nuxt-icon'], ["nuxt-editorjs"]
  ],
  vite: {
    optimizeDeps: {
      include: ["@editorjs/editorjs"],
    },
  },
  nuxtIcon: {
    size: '24px'
  }
})
