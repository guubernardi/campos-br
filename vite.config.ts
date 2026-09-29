import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

// As declarações de tipo (.d.ts) são geradas pelo vue-tsc num passo separado
// do build (ver script "build" no package.json). O vue-tsc entende SFCs .vue e
// emite um CampoX.vue.d.ts ao lado de cada componente, com os tipos reais das
// props — algo que os plugins de dts baseados em api-extractor não fazem.
export default defineConfig({
  plugins: [vue()],
  define: {
    __VERSAO__: JSON.stringify(version),
  },
  build: {
    // Extrai todo o CSS dos componentes num único arquivo (dist/estilo.css)
    // em vez de fragmentá-lo por componente.
    cssCodeSplit: false,
    lib: {
      // "index" é a entrada completa (com Vue); "validadores" só tem funções
      // puras e não importa o Vue, para uso em qualquer framework ou no Node.
      entry: {
        index: 'src/index.ts',
        validadores: 'src/validadores.ts',
      },
      formats: ['es'],
      fileName: (_formato, nome) => `${nome}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Código compartilhado entre as entradas fica num chunk de nome estável.
        chunkFileNames: 'compartilhado.js',
        // Garante um nome estável e plano para o CSS extraído.
        assetFileNames: (info) => {
          const nome = info.names?.[0] ?? info.name ?? ''
          return nome.endsWith('.css') ? 'estilo.css' : '[name][extname]'
        },
      },
    },
  },
})
