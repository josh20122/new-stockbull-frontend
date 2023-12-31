import { fileURLToPath } from "url";
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  app: {
    head: {
      title: "STOCKBULLCA",
      link: [{ rel: "icon", type: "image/x-icon", href: "/icon.ico" }],
      meta: [
        {
          name: "description",
          content:
            "Unlock the power of intelligent trading with StockBull AI, your trusted broker for next-level investment strategies. Harness cutting-edge artificial intelligence to make informed decisions, maximize profits, and navigate the dynamic world of stock trading. Elevate your trading experience with StockBull AI's innovative solutions, shaping the future of intelligent investing.",
        },
      ],
    },
  },
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
      // baseURL: "http://localhost:8000/api",
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
