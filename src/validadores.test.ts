import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import * as puro from './validadores'
import * as completo from './index'

describe('entrada campos-br/validadores', () => {
  it('exporta as funções puras', () => {
    expect(puro.validarCnpj('12.ABC.345/01DE-35')).toBe(true)
    expect(puro.validarCpf('529.982.247-25')).toBe(true)
    expect(puro.mascararCnpj('12abc34501de35')).toBe('12.ABC.345/01DE-35')
    expect(puro.mascararMoeda(123456)).toBe('R$ 1.234,56')
  })

  it('não importa o Vue', () => {
    const fonte = readFileSync(resolve(process.cwd(), 'src/validadores.ts'), 'utf-8')
    expect(fonte).not.toMatch(/from ['"]vue['"]/)
    expect(fonte).not.toMatch(/\.vue['"]/)
  })

  it('tudo que está na entrada pura também está na entrada completa', () => {
    for (const nome of Object.keys(puro)) {
      expect(completo).toHaveProperty(nome)
    }
  })
})

describe('versao', () => {
  it('acompanha a versão do package.json', () => {
    const { version } = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8'))
    expect(completo.versao()).toBe(version)
  })
})
