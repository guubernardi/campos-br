import { describe, it, expect } from 'vitest'
import { validarCnpj } from './cnpj'

describe('validarCnpj', () => {
  it('aceita CNPJs numéricos válidos', () => {
    expect(validarCnpj('11.222.333/0001-81')).toBe(true)
    expect(validarCnpj('04.252.011/0001-10')).toBe(true)
    expect(validarCnpj('00.000.000/0001-91')).toBe(true)
  })

  it('aceita CNPJ numérico sem máscara', () => {
    expect(validarCnpj('11222333000181')).toBe(true)
  })

  it('aceita CNPJs alfanuméricos válidos (novo formato)', () => {
    // Exemplo da Nota Técnica ENCAT 2025.001.
    expect(validarCnpj('12.ABC.345/01DE-35')).toBe(true)
    expect(validarCnpj('A1B2C3D4E5F668')).toBe(true)
    expect(validarCnpj('ABCDEFGH000195')).toBe(true)
  })

  it('rejeita CNPJ com dígito verificador errado', () => {
    expect(validarCnpj('11.222.333/0001-82')).toBe(false)
    expect(validarCnpj('12.ABC.345/01DE-36')).toBe(false)
    expect(validarCnpj('A1B2C3D4E5F669')).toBe(false)
  })

  it('rejeita dígitos verificadores não numéricos', () => {
    expect(validarCnpj('12.ABC.345/01DE-3X')).toBe(false)
    expect(validarCnpj('A1B2C3D4E5F6AB')).toBe(false)
  })

  it('rejeita caracteres repetidos', () => {
    expect(validarCnpj('00000000000000')).toBe(false)
    expect(validarCnpj('AAAAAAAAAAAAAA')).toBe(false)
  })

  it('rejeita tamanho incorreto', () => {
    expect(validarCnpj('123')).toBe(false)
    expect(validarCnpj('112223330001811')).toBe(false)
    expect(validarCnpj('')).toBe(false)
  })
})
