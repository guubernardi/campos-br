import { apenasDigitos } from '../utils/digitos'

/**
 * Aplica a máscara de CEP (00000-000) parcialmente conforme o usuário digita.
 */
export function mascararCep(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 8)

  let resultado = digitos.slice(0, 5)
  if (digitos.length > 5) {
    resultado += '-' + digitos.slice(5, 8)
  }

  return resultado
}
