import { computed, type ComputedRef, type Ref } from 'vue'
import { apenasDigitos } from '../utils/digitos'
import { mascararTelefone } from '../mascaras/telefone'

export interface UseTelefone {
  /** Valor formatado como telefone (fixo ou celular). */
  mascarado: ComputedRef<string>
  /** Verdadeiro quando há 10 (fixo) ou 11 (celular) dígitos. */
  valido: ComputedRef<boolean>
  /** Handler de evento de input: limpa o digitado e grava no modelo. */
  aoDigitar: (evento: Event) => void
}

/**
 * Composable de telefone. Recebe o Ref do valor limpo (só dígitos) e deriva
 * máscara e validade por formato.
 */
export function useTelefone(modelo: Ref<string>): UseTelefone {
  const mascarado = computed(() => mascararTelefone(modelo.value))

  const valido = computed(() => {
    const digitos = apenasDigitos(modelo.value).length
    return digitos === 10 || digitos === 11
  })

  function aoDigitar(evento: Event): void {
    const bruto = (evento.target as HTMLInputElement).value
    modelo.value = apenasDigitos(bruto)
  }

  return { mascarado, valido, aoDigitar }
}
