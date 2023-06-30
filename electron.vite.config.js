import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import ViteFS from "vite-fs"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), ViteFS()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), ViteFS()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react(), ViteFS()]
  }
})
