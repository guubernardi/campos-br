import { defineConfig } from 'vitest/config'
import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

export default defineConfig({
  // O plugin do Vue permite que o Vitest compile os SFCs (.vue) nos testes.
  plugins: [vue()],
  define: {
    __VERSAO__: JSON.stringify(version),
  },
  test: {
    include: ['src/**/*.test.ts'],
    // Ambiente de DOM para montar e interagir com os componentes.
    environment: 'happy-dom',
  },
})
