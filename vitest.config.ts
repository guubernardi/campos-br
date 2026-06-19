import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // O plugin do Vue permite que o Vitest compile os SFCs (.vue) nos testes.
  plugins: [vue()],
  test: {
    include: ['src/**/*.test.ts'],
    // Ambiente de DOM para montar e interagir com os componentes.
    environment: 'happy-dom',
  },
})
