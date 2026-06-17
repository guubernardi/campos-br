import { apenasDigitos } from '../utils/digitos'

/**
 * Valida um CEP apenas por formato: 8 dígitos e não composto somente de zeros.
 * O CEP não possui dígito verificador.
 */
export function validarCep(valor: string): boolean {
  const limpo = apenasDigitos(valor)

  if (limpo.length !== 8) {
    return false
  }

  if (/^0{8}$/.test(limpo)) {
    return false
  }

  return true
}
