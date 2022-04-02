import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import gzipPlugin from 'rollup-plugin-gzip'
import { brotliCompressSync, constants } from 'zlib'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), gzipPlugin({ filter: /\.(js|mjs|json|css|html|wasm)$/ }), gzipPlugin({
    customCompression: content => brotliCompressSync(Buffer.from(content), {
      [constants.BROTLI_PARAM_QUALITY]: 11
    }),
    fileName: '.br',
    filter: /\.(js|mjs|json|css|html|wasm)$/
  })]
})
