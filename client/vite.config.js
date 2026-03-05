import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  base: "./",  // This is good for relative paths
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, "../server/public"),
    emptyOutDir: true,
    assetsDir: "assets",
    // Add this to see more build info
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})