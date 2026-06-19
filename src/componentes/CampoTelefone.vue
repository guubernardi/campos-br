<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTelefone } from '../composables/useTelefone'

/** Valor limpo (fonte da verdade exposta pelo v-model do usuário). */
const modelo = defineModel<string>({ default: '' })
/** Validade derivada, exposta via v-model:valido. */
const valido = defineModel<boolean>('valido', { default: false })

const props = withDefaults(
  defineProps<{
    rotulo?: string
    id?: string
    placeholder?: string
    desabilitado?: boolean
    obrigatorio?: boolean
    mensagemErro?: string
  }>(),
  {
    mensagemErro: 'Telefone inválido',
  },
)

const { mascarado, valido: validoInterno, aoDigitar } = useTelefone(modelo)

// Reflete a validade interna no modelo nomeado para o componente pai.
watch(validoInterno, (atual) => (valido.value = atual), { immediate: true })

const tocado = ref(false)
const mostrarErro = computed(
  () => tocado.value && !validoInterno.value && (props.obrigatorio || modelo.value.length > 0),
)

function aoInput(evento: Event): void {
  aoDigitar(evento)
  // Trata o "caractere fantasma": caracteres que não alteram o valor limpo
  // (letras, dígitos além do limite) não devem ficar visíveis na tela.
  const input = evento.target as HTMLInputElement
  input.value = mascarado.value
  const fim = input.value.length
  input.setSelectionRange?.(fim, fim)
}

function aoBlur(): void {
  tocado.value = true
}
</script>

<template>
  <div class="campos-br-campo" :class="{ 'campos-br-campo--erro': mostrarErro }">
    <label v-if="rotulo" class="campos-br-campo__rotulo" :for="id">{{ rotulo }}</label>
    <input
      :id="id"
      class="campos-br-campo__input"
      type="tel"
      inputmode="numeric"
      :value="mascarado"
      :placeholder="placeholder"
      :disabled="desabilitado"
      :required="obrigatorio"
      :aria-invalid="mostrarErro"
      @input="aoInput"
      @blur="aoBlur"
    />
    <span v-if="mostrarErro" class="campos-br-campo__erro" role="alert">{{ mensagemErro }}</span>
  </div>
</template>
