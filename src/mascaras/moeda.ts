import { apenasDigitos } from '../utils/digitos'

/**
 * Formata um valor em centavos (inteiro) como moeda brasileira.
 *
 * Ex.: 123456 -> "R$ 1.234,56"
 *      5      -> "R$ 0,05"
 *      0      -> "R$ 0,00"
 *      -100   -> "-R$ 1,00"
 */
export function mascararMoeda(centavos: number): string {
  const negativo = centavos < 0
  const abs = Math.abs(Math.trunc(centavos || 0))

  const reais = Math.floor(abs / 100)
  const restante = abs % 100

  // Agrupa os milhares com ponto: 1234 -> "1.234".
  const reaisStr = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const centavosStr = String(restante).padStart(2, '0')

  return `${negativo ? '-' : ''}R$ ${reaisStr},${centavosStr}`
}

/**
 * Converte o texto digitado em centavos (inteiro), estilo calculadora:
 * os dígitos preenchem o valor da direita para a esquerda.
 *
 * Ex.: "1.234,56" -> 123456
 *      "5"        -> 5
 *      ""         -> 0
 */
export function centavosDeTexto(valor: string): number {
  const digitos = apenasDigitos(valor)
  return digitos ? parseInt(digitos, 10) : 0
}
