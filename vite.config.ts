import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@zq-ui': resolve(__dirname, 'packages/zq-ui'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
