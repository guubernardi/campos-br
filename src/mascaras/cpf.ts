import { apenasDigitos } from '../utils/digitos'

/**
 * Aplica a máscara de CPF (000.000.000-00) parcialmente conforme o usuário digita.
 */
export function mascararCpf(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 11)

  let resultado = digitos.slice(0, 3)
  if (digitos.length > 3) {
    resultado += '.' + digitos.slice(3, 6)
  }
  if (digitos.length > 6) {
    resultado += '.' + digitos.slice(6, 9)
  }
  if (digitos.length > 9) {
    resultado += '-' + digitos.slice(9, 11)
  }

  return resultado
}
