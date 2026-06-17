import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // Achata a saída removendo a subpasta src: as declarações emitidas vão
      // direto para dist/ (dist/index.d.ts em vez de dist/src/index.d.ts).
      entryRoot: 'src',
      // Bundla todas as declarações num único arquivo dist/index.d.ts usando
      // @microsoft/api-extractor. O caminho de entrada vem do campo "types" do
      // package.json.
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
})