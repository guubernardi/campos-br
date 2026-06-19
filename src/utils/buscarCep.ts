import { apenasDigitos } from './digitos'

/**
 * Endereço normalizado com campos em português.
 */
export interface Endereco {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
}

/**
 * Formato (parcial) da resposta da API do ViaCEP.
 */
interface RespostaViaCep {
  cep?: string
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean | string
}

/**
 * Função padrão de busca de endereço: consulta a API pública do ViaCEP e
 * normaliza a resposta para um objeto {@link Endereco} com campos em português.
 *
 * Lança um erro tratável quando o CEP é inválido ou não existe.
 */
export async function buscarCepViaCep(cep: string): Promise<Endereco> {
  const limpo = apenasDigitos(cep)

  if (limpo.length !== 8) {
    throw new Error('CEP inválido')
  }

  const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`)

  if (!resposta.ok) {
    throw new Error('Falha ao consultar o CEP')
  }

  const dados = (await resposta.json()) as RespostaViaCep

  // O ViaCEP devolve { "erro": true } (ou "erro": "true") para CEP inexistente.
  if (dados.erro) {
    throw new Error('CEP não encontrado')
  }

  return {
    cep: dados.cep ?? '',
    logradouro: dados.logradouro ?? '',
    bairro: dados.bairro ?? '',
    cidade: dados.localidade ?? '',
    estado: dados.uf ?? '',
  }
}
