import swc from 'unplugin-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const alias = {
  '@': resolve(__dirname, '../src')
}

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    alias,
    root: './'
  },
  plugins: [
    swc.vite({
      module: {
        type: 'es6'
      }
    })
  ]
})
