import { fileURLToPath } from "url";
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  ssr: false,
  colorMode: {
    preference: "dark",
  },
  plugins: [{ ssr: false, src: "plugins/axiosConfigs" }],
  alias: {
    "@utils": fileURLToPath(new URL(".utils", import.meta.url)),
  },

  runtimeConfig: {
    public: {
      baseURL: "https://api.stockbull.live/api",
      pusher: {
        broadcaster: "pusher",

        key: "d34d6617f3abb27f0ad9",
        cluster: "ap2",
        wsHost: `ws-${"ap2"}.pusher.com`,
        wsPort: 80,
        wssPort: 443,
        forceTLS: "https",
        enabledTransports: ["ws", "wss"],
      },
    },
  },
});
