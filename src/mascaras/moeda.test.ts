import { describe, it, expect } from 'vitest'
import { mascararMoeda, centavosDeTexto } from './moeda'

describe('mascararMoeda', () => {
  it('formata valor com milhares e centavos', () => {
    expect(mascararMoeda(123456)).toBe('R$ 1.234,56')
  })

  it('formata valores pequenos preenchendo os centavos', () => {
    expect(mascararMoeda(0)).toBe('R$ 0,00')
    expect(mascararMoeda(5)).toBe('R$ 0,05')
    expect(mascararMoeda(50)).toBe('R$ 0,50')
    expect(mascararMoeda(100)).toBe('R$ 1,00')
  })

  it('agrupa milhões corretamente', () => {
    expect(mascararMoeda(123456789)).toBe('R$ 1.234.567,89')
  })

  it('formata valores negativos com sinal antes do símbolo', () => {
    expect(mascararMoeda(-100)).toBe('-R$ 1,00')
  })
})

describe('centavosDeTexto', () => {
  it('extrai centavos do texto mascarado', () => {
    expect(centavosDeTexto('R$ 1.234,56')).toBe(123456)
    expect(centavosDeTexto('5')).toBe(5)
  })

  it('retorna 0 quando não há dígitos', () => {
    expect(centavosDeTexto('')).toBe(0)
    expect(centavosDeTexto('R$ ,')).toBe(0)
  })
})
