import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { apenasDigitos } from '../utils/digitos'
import { mascararCep } from '../mascaras/cep'
import { validarCep } from '../validadores/cep'
import { buscarCepViaCep, type Endereco } from '../utils/buscarCep'

export interface OpcoesUseCep {
  /** Fonte de busca de endereço injetável. Padrão: {@link buscarCepViaCep}. */
  buscarEndereco?: (cep: string) => Promise<Endereco>
}

export interface UseCep {
  /** Valor formatado como CEP (00000-000). */
  mascarado: ComputedRef<string>
  /** Se o CEP é válido por formato. */
  valido: ComputedRef<boolean>
  /** Handler de evento de input: limpa o digitado e grava no modelo. */
  aoDigitar: (evento: Event) => void
  /** Endereço encontrado pela última busca bem-sucedida (ou null). */
  endereco: Ref<Endereco | null>
  /** Se uma busca está em andamento. */
  carregando: Ref<boolean>
  /** Mensagem de erro da última busca (ou null). */
  erro: Ref<string | null>
  /** Consulta o endereço a partir do CEP limpo do modelo. */
  buscar: () => Promise<void>
}

/**
 * Composable de CEP. Recebe o Ref do valor limpo (só dígitos) e deriva máscara
 * e validade, além de oferecer busca de endereço com fonte injetável.
 */
export function useCep(modelo: Ref<string>, opcoes: OpcoesUseCep = {}): UseCep {
  const buscarEndereco = opcoes.buscarEndereco ?? buscarCepViaCep

  const mascarado = computed(() => mascararCep(modelo.value))
  const valido = computed(() => validarCep(modelo.value))

  const endereco = ref<Endereco | null>(null)
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  function aoDigitar(evento: Event): void {
    const bruto = (evento.target as HTMLInputElement).value
    modelo.value = apenasDigitos(bruto)
  }

  async function buscar(): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      endereco.value = await buscarEndereco(apenasDigitos(modelo.value))
    } catch (e) {
      endereco.value = null
      erro.value = e instanceof Error ? e.message : 'Erro ao buscar o CEP'
    } finally {
      carregando.value = false
    }
  }

  return { mascarado, valido, aoDigitar, endereco, carregando, erro, buscar }
}
