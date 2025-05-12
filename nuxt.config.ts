// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/global.css'],
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('provet-'),
        },
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.includes('-')
    }
  }
});
