/**
 * Entrada "campos-br/validadores": só funções puras, sem depender do Vue.
 *
 * Serve para React, Angular, Svelte, Node ou qualquer JavaScript: validação e
 * máscara de CPF, CNPJ (inclusive alfanumérico), CEP, telefone e moeda, além
 * da busca de endereço no ViaCEP.
 */

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
export { mascararMoeda, centavosDeTexto } from './mascaras/moeda'

// Busca de CEP
export { buscarCepViaCep, type Endereco } from './utils/buscarCep'
