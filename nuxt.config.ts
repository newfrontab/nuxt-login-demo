// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/global.scss'],
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
      isCustomElement: (tag: string) => tag.includes('-'),
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: '', // NUXT_PUBLIC_FIREBASE_API_KEY
      firebaseAuthDomain: '', // NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN
      firebaseProjectId: '', // NUXT_PUBLIC_FIREBASE_PROJECT_ID
      firebaseStorageBucket: '', // NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      firebaseMessagingSenderId: '', // NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
      firebaseAppId: '', // NUXT_PUBLIC_FIREBASE_APP_ID
      firebaseMeasurementId: '', // NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    },
  },
  ssr: false,
});
