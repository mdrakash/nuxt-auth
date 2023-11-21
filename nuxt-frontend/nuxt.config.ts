// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 3',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: { enabled: true },
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],
  plugins: [
    { src: "~/plugins/bootstrap.js",mode:'client' }
  ],
  modules: [
    '@pinia/nuxt',
  ],
});
