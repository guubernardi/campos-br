import { apenasAlfanumerico } from '../utils/digitos'

/**
 * Converte um caractere do CNPJ em seu valor numérico subtraindo 48 do código.
 * Assim, '0'-'9' viram 0-9 e 'A'-'Z' viram 17-42.
 */
function valorCaractere(caractere: string): number {
  return caractere.charCodeAt(0) - 48
}

/**
 * Calcula um dígito verificador de CNPJ pelo módulo 11.
 */
function digitoVerificador(caracteres: string, pesos: number[]): number {
  let soma = 0
  for (let i = 0; i < pesos.length; i++) {
    soma += valorCaractere(caracteres[i]) * pesos[i]
  }
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

/**
 * Valida um CNPJ tradicional (numérico) ou alfanumérico.
 *
 * O CNPJ alfanumérico segue a Nota Técnica ENCAT 2025.001, com entrada em
 * produção a partir de julho de 2026: as 12 primeiras posições podem conter
 * letras e números, e as 2 últimas (dígitos verificadores) continuam numéricas.
 */
export function validarCnpj(valor: string): boolean {
  const limpo = apenasAlfanumerico(valor)

  if (limpo.length !== 14) {
    return false
  }

  // Os dois dígitos verificadores devem ser numéricos.
  if (!/^\d{2}$/.test(limpo.slice(12))) {
    return false
  }

  // Rejeita sequências com todos os caracteres iguais.
  if (/^(.)\1{13}$/.test(limpo)) {
    return false
  }

  const pesosPrimeiro = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const primeiro = digitoVerificador(limpo.slice(0, 12), pesosPrimeiro)
  if (primeiro !== Number(limpo[12])) {
    return false
  }

  const pesosSegundo = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const segundo = digitoVerificador(limpo.slice(0, 13), pesosSegundo)
  if (segundo !== Number(limpo[13])) {
    return false
  }

  return true
}
