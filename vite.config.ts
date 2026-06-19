import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// As declarações de tipo (.d.ts) são geradas pelo vue-tsc num passo separado
// do build (ver script "build" no package.json). O vue-tsc entende SFCs .vue e
// emite um CampoX.vue.d.ts ao lado de cada componente, com os tipos reais das
// props — algo que os plugins de dts baseados em api-extractor não fazem.
export default defineConfig({
  plugins: [vue()],
  build: {
    // Extrai todo o CSS dos componentes num único arquivo (dist/estilo.css)
    // em vez de fragmentá-lo por componente.
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Garante um nome estável e plano para o CSS extraído.
        assetFileNames: (info) => {
          const nome = info.names?.[0] ?? info.name ?? ''
          return nome.endsWith('.css') ? 'estilo.css' : '[name][extname]'
        },
      },
    },
  },
})