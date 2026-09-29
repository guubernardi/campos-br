/**
 * Versão da lib, injetada no build a partir do package.json.
 */
export function versao(): string {
  return __VERSAO__
}

// Funções puras (validadores, máscaras, utilitários e busca de CEP).
// Também disponíveis sem Vue em "campos-br/validadores".
export * from './validadores'

// Composables
export { useDocumento } from './composables/useDocumento'
export { useTelefone } from './composables/useTelefone'
export { useCep } from './composables/useCep'
export { useMoeda } from './composables/useMoeda'

// Componentes
export { default as CampoDocumento } from './componentes/CampoDocumento.vue'
export { default as CampoTelefone } from './componentes/CampoTelefone.vue'
export { default as CampoCep } from './componentes/CampoCep.vue'
export { default as CampoMoeda } from './componentes/CampoMoeda.vue'
