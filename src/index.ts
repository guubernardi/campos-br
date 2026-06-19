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

// Composables
export { useDocumento } from './composables/useDocumento'
export { useTelefone } from './composables/useTelefone'
export { useCep } from './composables/useCep'

// Busca de CEP
export { buscarCepViaCep, type Endereco } from './utils/buscarCep'
