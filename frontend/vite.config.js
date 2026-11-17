import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // a PDF is always its own file (never a data: URL), so its link opens in a new tab like any document
  build: { assetsInlineLimit: (file) => (file.endsWith('.pdf') ? false : undefined) },
})
