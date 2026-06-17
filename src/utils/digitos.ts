/**
 * Remove tudo que não for dígito (0-9) da string.
 */
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

/**
 * Coloca a string em maiúsculas e mantém apenas letras A-Z e dígitos 0-9.
 * Usada pelo CNPJ alfanumérico.
 */
export function apenasAlfanumerico(valor: string): string {
  return valor.toUpperCase().replace(/[^A-Z0-9]/g, '')
}
