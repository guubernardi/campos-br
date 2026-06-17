import { describe, it, expect } from 'vitest'
import { mascararCpf } from './cpf'
import { mascararCnpj } from './cnpj'
import { mascararCep } from './cep'
import { mascararTelefone } from './telefone'

describe('mascararCpf', () => {
  it('formata CPF completo', () => {
    expect(mascararCpf('52998224725')).toBe('529.982.247-25')
  })

  it('formata parcialmente conforme digita', () => {
    expect(mascararCpf('529')).toBe('529')
    expect(mascararCpf('5299')).toBe('529.9')
    expect(mascararCpf('529982')).toBe('529.982')
    expect(mascararCpf('5299822')).toBe('529.982.2')
    expect(mascararCpf('529982247')).toBe('529.982.247')
    expect(mascararCpf('5299822472')).toBe('529.982.247-2')
  })

  it('descarta excesso de dígitos', () => {
    expect(mascararCpf('5299822472599')).toBe('529.982.247-25')
  })
})

describe('mascararCnpj', () => {
  it('formata CNPJ numérico completo', () => {
    expect(mascararCnpj('11222333000181')).toBe('11.222.333/0001-81')
  })

  it('formata CNPJ alfanumérico com letras nas 12 primeiras posições', () => {
    expect(mascararCnpj('12ABC34501DE35')).toBe('12.ABC.345/01DE-35')
  })

  it('formata parcialmente conforme digita', () => {
    expect(mascararCnpj('11')).toBe('11')
    expect(mascararCnpj('11222')).toBe('11.222')
    expect(mascararCnpj('11222333')).toBe('11.222.333')
    expect(mascararCnpj('112223330001')).toBe('11.222.333/0001')
    expect(mascararCnpj('1122233300018')).toBe('11.222.333/0001-8')
  })
})

describe('mascararCep', () => {
  it('formata CEP completo', () => {
    expect(mascararCep('01310100')).toBe('01310-100')
  })

  it('formata parcialmente conforme digita', () => {
    expect(mascararCep('013')).toBe('013')
    expect(mascararCep('01310')).toBe('01310')
    expect(mascararCep('013101')).toBe('01310-1')
  })
})

describe('mascararTelefone', () => {
  it('formata telefone fixo', () => {
    expect(mascararTelefone('1133334444')).toBe('(11) 3333-4444')
  })

  it('formata celular', () => {
    expect(mascararTelefone('11999998888')).toBe('(11) 99999-8888')
  })

  it('formata parcialmente conforme digita', () => {
    expect(mascararTelefone('11')).toBe('(11)')
    expect(mascararTelefone('113')).toBe('(11) 3')
    expect(mascararTelefone('11333')).toBe('(11) 333')
    expect(mascararTelefone('113333')).toBe('(11) 3333')
    expect(mascararTelefone('1133334')).toBe('(11) 3333-4')
  })
})
