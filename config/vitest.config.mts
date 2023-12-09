import swc from 'unplugin-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const alias = {
  '@': resolve(__dirname, '../src')
}

export default defineConfig({
  plugins: [
    swc.vite({
      module: {
        type: 'es6'
      }
    })
  ],
  test: {
    globals: true,
    alias
  }
})
