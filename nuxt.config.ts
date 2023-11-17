export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-headlessui"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
