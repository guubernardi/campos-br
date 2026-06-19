import { computed, type ComputedRef, type Ref } from 'vue'
import { apenasAlfanumerico, apenasDigitos } from '../utils/digitos'
import { mascararCpf } from '../mascaras/cpf'
import { mascararCnpj } from '../mascaras/cnpj'
import { validarCpf } from '../validadores/cpf'
import { validarCnpj } from '../validadores/cnpj'

export type TipoDocumento = 'cpf' | 'cnpj'

export interface UseDocumento {
  /** Valor formatado com a máscara apropriada ao tipo. */
  mascarado: ComputedRef<string>
  /** Tipo do documento conforme a quantidade de dígitos, ou null se vazio. */
  tipo: ComputedRef<TipoDocumento | null>
  /** Se o documento é válido segundo o validador do tipo. */
  valido: ComputedRef<boolean>
  /** Handler de evento de input: limpa o digitado e grava no modelo. */
  aoDigitar: (evento: Event) => void
}

/**
 * Composable de documento (CPF/CNPJ). Recebe o Ref do valor limpo (fonte da
 * verdade exposta pelo v-model) e deriva máscara, tipo e validade.
 *
 * O CNPJ pode ser alfanumérico, então o tipo é decidido pela contagem de
 * caracteres alfanuméricos: até 11 é CPF, acima disso é CNPJ.
 */
export function useDocumento(modelo: Ref<string>): UseDocumento {
  const tipo = computed<TipoDocumento | null>(() => {
    const limpo = apenasAlfanumerico(modelo.value)
    if (limpo.length === 0) {
      return null
    }
    return limpo.length <= 11 ? 'cpf' : 'cnpj'
  })

  const mascarado = computed(() =>
    tipo.value === 'cnpj' ? mascararCnpj(modelo.value) : mascararCpf(modelo.value),
  )

  const valido = computed(() => {
    if (tipo.value === 'cnpj') {
      return validarCnpj(modelo.value)
    }
    if (tipo.value === 'cpf') {
      return validarCpf(modelo.value)
    }
    return false
  })

  function aoDigitar(evento: Event): void {
    const bruto = (evento.target as HTMLInputElement).value
    // CPF tem 11 dígitos; acima disso é CNPJ, que pode ser alfanumérico.
    const ehCnpj = apenasDigitos(bruto).length > 11 || apenasAlfanumerico(bruto).length > 11
    modelo.value = ehCnpj ? apenasAlfanumerico(bruto) : apenasDigitos(bruto)
  }

  return { mascarado, tipo, valido, aoDigitar }
}
