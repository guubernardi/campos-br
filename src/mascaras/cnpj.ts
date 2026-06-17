import { apenasAlfanumerico, apenasDigitos } from '../utils/digitos'

/**
 * Aplica a máscara de CNPJ (00.000.000/0000-00) parcialmente conforme o usuário digita.
 *
 * Suporta letras nas 12 primeiras posições (CNPJ alfanumérico); as 2 últimas
 * posições (dígitos verificadores) aceitam apenas números.
 */
export function mascararCnpj(valor: string): string {
  const base = apenasAlfanumerico(valor).slice(0, 14)
  // As 12 primeiras posições podem ser alfanuméricas; as 2 últimas são numéricas.
  const corpo = base.slice(0, 12)
  const verificadores = apenasDigitos(base.slice(12)).slice(0, 2)
  const caracteres = corpo + verificadores

  let resultado = caracteres.slice(0, 2)
  if (caracteres.length > 2) {
    resultado += '.' + caracteres.slice(2, 5)
  }
  if (caracteres.length > 5) {
    resultado += '.' + caracteres.slice(5, 8)
  }
  if (caracteres.length > 8) {
    resultado += '/' + caracteres.slice(8, 12)
  }
  if (caracteres.length > 12) {
    resultado += '-' + caracteres.slice(12, 14)
  }

  return resultado
}
