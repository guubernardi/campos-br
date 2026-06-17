export function versao() {
    return '0.0.1'
}

// Utilitários
export { apenasDigitos, apenasAlfanumerico } from './utils/digitos'

// Validadores
export { validarCpf } from './validadores/cpf'
export { validarCnpj } from './validadores/cnpj'
export { validarCep } from './validadores/cep'

// Máscaras
export { mascararCpf } from './mascaras/cpf'
export { mascararCnpj } from './mascaras/cnpj'
export { mascararCep } from './mascaras/cep'
export { mascararTelefone } from './mascaras/telefone'
