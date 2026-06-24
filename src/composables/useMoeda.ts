import { computed, type ComputedRef, type Ref } from 'vue'
import { mascararMoeda, centavosDeTexto } from '../mascaras/moeda'

export interface UseMoeda {
  /** Valor formatado como moeda brasileira (ex.: "R$ 1.234,56"). */
  mascarado: ComputedRef<string>
  /** Verdadeiro quando há um valor maior que zero. */
  valido: ComputedRef<boolean>
  /** Handler de evento de input: converte o digitado em centavos e grava no modelo. */
  aoDigitar: (evento: Event) => void
}

/**
 * Composable de moeda. Recebe o Ref do valor em centavos (inteiro) e deriva
 * a máscara em reais. A digitação preenche da direita para a esquerda.
 */
export function useMoeda(modelo: Ref<number>): UseMoeda {
  const mascarado = computed(() => mascararMoeda(modelo.value))

  const valido = computed(() => Math.trunc(modelo.value || 0) > 0)

  function aoDigitar(evento: Event): void {
    const bruto = (evento.target as HTMLInputElement).value
    modelo.value = centavosDeTexto(bruto)
  }

  return { mascarado, valido, aoDigitar }
}
