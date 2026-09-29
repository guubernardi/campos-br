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

/** Indica se a string (já em maiúsculas) contém alguma letra. */
function temLetra(valor: string): boolean {
  return /[A-Z]/.test(valor)
}

/**
 * Limita o CNPJ a 14 caracteres: 12 alfanuméricos e 2 dígitos verificadores
 * numéricos. Letras nas posições dos verificadores são descartadas.
 */
function limparCnpj(alfanumerico: string): string {
  const corpo = alfanumerico.slice(0, 12)
  const verificadores = apenasDigitos(alfanumerico.slice(12)).slice(0, 2)
  return corpo + verificadores
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
    // CPF nunca tem letras: qualquer letra indica um CNPJ alfanumérico.
    return limpo.length <= 11 && !temLetra(limpo) ? 'cpf' : 'cnpj'
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
    const alfanumerico = apenasAlfanumerico(bruto)
    // CPF tem 11 dígitos e nenhuma letra. Acima disso, ou com qualquer letra,
    // é CNPJ, que pode ser alfanumérico. Assim o CNPJ alfanumérico pode ser
    // digitado caractere a caractere, e não só colado.
    const ehCnpj = alfanumerico.length > 11 || temLetra(alfanumerico)
    modelo.value = ehCnpj ? limparCnpj(alfanumerico) : apenasDigitos(bruto).slice(0, 11)
  }

  return { mascarado, tipo, valido, aoDigitar }
}
