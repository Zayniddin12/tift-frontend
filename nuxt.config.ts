// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: 'page-change', mode: 'out-in' },
    head: {
      title: 'TIFT',
      script: [{ src: '//code.jivo.ru/widget/el0JS9U6Wx', async: true }],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.svg',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=0',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'og:site_name',
          content: 'TIFT',
        },
        {
          name: 'keywords',
          content: 'TIFT, University, Education, College, School',
        },
      ],
    },
  },
  plugins: ['~/plugins/facebook-pixel.ts'],
  css: [
    '~/assets/tailwind.css',
    '~/assets/icomoon/style.css',
    '~/assets/styles/toastofication.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    // 'nuxt-swiper',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxt/image',
    'nuxt-gtag',
  ],
  nitro: {
    serveStatic: true,
  },
  build: {
    transpile: ['vue-toastification'],
  },
  gtag: {
    id: 'G-QHCQ433E4N',
  },
  devServerHandlers: [],
  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },
  devtools: { enabled: true },
})
