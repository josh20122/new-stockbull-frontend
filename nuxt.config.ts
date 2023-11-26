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
      baseURL: "https://stockbullsecure.com/api",
      pusher: {
        broadcaster: "pusher",

        key: "a352914ff522e7a5f37c",
        cluster: "eu",
        wsHost: `ws-${"eu"}.pusher.com`,
        wsPort: 80,
        wssPort: 443,
        forceTLS: "https",
        enabledTransports: ["ws", "wss"],
      },
    },
  },
});
