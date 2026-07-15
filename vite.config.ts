/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@zq-ui': resolve(__dirname, 'packages/zq-ui'),
    },
  },
  server: {
    port: 4000,
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
