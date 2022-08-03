import { defineConfig } from "vite"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: ".",
    rollupOptions: {
      input: "/src/index.tsx",
      output: {
        dir: "dist",
        assetFileNames: "style.css",
        entryFileNames: "bundle.js",
      },
    },
  },
  resolve: {
    alias: {
      helpers: "/src/helpers"
    },
  },
  plugins: [
    preact(),
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  server: {
    open: "/src/index.html",
    host: true,
  },
})