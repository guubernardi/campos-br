import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))

// Demo publicada no GitHub Pages. Usa o código-fonte direto de src/, então
// sempre mostra o estado atual da lib.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/campos-br/',
  plugins: [vue()],
  define: {
    __VERSAO__: JSON.stringify(version),
  },
  resolve: {
    alias: {
      'campos-br/estilo.css': `${raiz}src/componentes/estilo.css`,
      'campos-br': `${raiz}src/index.ts`,
    },
  },
  build: {
    outDir: `${raiz}demo-dist`,
    emptyOutDir: true,
  },
})
