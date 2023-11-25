module.exports = {
  daisyui: {
    themes: ["dark"],
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f59e0b",

          secondary: "#2563eb",

          accent: "#dc2626",

          neutral: "#1f2937",

          "base-100": "#111827",

          info: "#4b5563",

          success: "#84cc16",

          warning: "#ffffff",

          error: "#dc2626",
        },
      },
    ],
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
// import type { Config } from "tailwindcss";

// export default <Partial<Config>>{
//   content: ["docs/content/**/*.md"],
// };
