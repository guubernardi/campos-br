import { describe, it, expect } from 'vitest'
import { validarCpf } from './cpf'

describe('validarCpf', () => {
  it('aceita CPFs válidos reais', () => {
    expect(validarCpf('529.982.247-25')).toBe(true)
    expect(validarCpf('111.444.777-35')).toBe(true)
    expect(validarCpf('390.533.447-05')).toBe(true)
  })

  it('aceita CPF válido sem máscara', () => {
    expect(validarCpf('52998224725')).toBe(true)
  })

  it('rejeita CPF com dígito verificador errado', () => {
    expect(validarCpf('529.982.247-24')).toBe(false)
    expect(validarCpf('111.444.777-30')).toBe(false)
  })

  it('rejeita dígitos repetidos', () => {
    expect(validarCpf('111.111.111-11')).toBe(false)
    expect(validarCpf('00000000000')).toBe(false)
    expect(validarCpf('99999999999')).toBe(false)
  })

  it('rejeita tamanho incorreto', () => {
    expect(validarCpf('123')).toBe(false)
    expect(validarCpf('5299822472')).toBe(false)
    expect(validarCpf('529982247250')).toBe(false)
    expect(validarCpf('')).toBe(false)
  })
})
