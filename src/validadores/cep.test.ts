import { describe, it, expect } from 'vitest'
import { validarCep } from './cep'

describe('validarCep', () => {
  it('aceita CEPs válidos', () => {
    expect(validarCep('01310-100')).toBe(true)
    expect(validarCep('20040002')).toBe(true)
    expect(validarCep('80010-000')).toBe(true)
  })

  it('rejeita CEP só de zeros', () => {
    expect(validarCep('00000-000')).toBe(false)
    expect(validarCep('00000000')).toBe(false)
  })

  it('rejeita tamanho incorreto', () => {
    expect(validarCep('1234567')).toBe(false)
    expect(validarCep('123456789')).toBe(false)
    expect(validarCep('')).toBe(false)
  })
})
