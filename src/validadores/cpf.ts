import { apenasDigitos } from '../utils/digitos'

/**
 * Calcula um dígito verificador de CPF pelo módulo 11.
 * Recebe os dígitos base e os pesos correspondentes.
 */
function digitoVerificador(digitos: number[], pesos: number[]): number {
  const soma = digitos.reduce((acumulado, digito, indice) => acumulado + digito * pesos[indice], 0)
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

/**
 * Valida um CPF (numérico, 11 dígitos) pelo cálculo dos dois dígitos verificadores.
 */
export function validarCpf(valor: string): boolean {
  const limpo = apenasDigitos(valor)

  if (limpo.length !== 11) {
    return false
  }

  // Rejeita sequências com todos os dígitos iguais (ex.: 000.000.000-00).
  if (/^(\d)\1{10}$/.test(limpo)) {
    return false
  }

  const numeros = limpo.split('').map(Number)

  const pesosPrimeiro = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const primeiro = digitoVerificador(numeros.slice(0, 9), pesosPrimeiro)
  if (primeiro !== numeros[9]) {
    return false
  }

  const pesosSegundo = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  const segundo = digitoVerificador(numeros.slice(0, 10), pesosSegundo)
  if (segundo !== numeros[10]) {
    return false
  }

  return true
}
