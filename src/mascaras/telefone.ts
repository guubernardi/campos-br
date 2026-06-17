import { apenasDigitos } from '../utils/digitos'

/**
 * Aplica a máscara de telefone parcialmente conforme o usuário digita.
 *
 * Escolhe o formato pela quantidade de dígitos:
 * - fixo:    (00) 0000-0000  (até 10 dígitos)
 * - celular: (00) 00000-0000 (11 dígitos)
 */
export function mascararTelefone(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 11)

  let resultado = ''
  if (digitos.length > 0) {
    resultado = '(' + digitos.slice(0, 2)
  }
  if (digitos.length >= 2) {
    resultado += ')'
  }
  if (digitos.length > 2) {
    resultado += ' '
  }

  if (digitos.length <= 10) {
    // Formato fixo: (00) 0000-0000
    resultado += digitos.slice(2, 6)
    if (digitos.length > 6) {
      resultado += '-' + digitos.slice(6, 10)
    }
  } else {
    // Formato celular: (00) 00000-0000
    resultado += digitos.slice(2, 7)
    resultado += '-' + digitos.slice(7, 11)
  }

  return resultado
}
