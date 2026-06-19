import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useDocumento } from './useDocumento'

describe('useDocumento', () => {
  it('reage como CPF para até 11 dígitos', () => {
    const modelo = ref('')
    const { mascarado, tipo, valido } = useDocumento(modelo)

    expect(tipo.value).toBeNull()
    expect(valido.value).toBe(false)

    modelo.value = '52998224725'
    expect(tipo.value).toBe('cpf')
    expect(mascarado.value).toBe('529.982.247-25')
    expect(valido.value).toBe(true)

    modelo.value = '52998224724'
    expect(valido.value).toBe(false)
  })

  it('reage como CNPJ acima de 11 caracteres (numérico e alfanumérico)', () => {
    const modelo = ref('')
    const { mascarado, tipo, valido } = useDocumento(modelo)

    modelo.value = '11222333000181'
    expect(tipo.value).toBe('cnpj')
    expect(mascarado.value).toBe('11.222.333/0001-81')
    expect(valido.value).toBe(true)

    modelo.value = '12ABC34501DE35'
    expect(tipo.value).toBe('cnpj')
    expect(mascarado.value).toBe('12.ABC.345/01DE-35')
    expect(valido.value).toBe(true)
  })

  it('aoDigitar limpa e grava o valor no modelo', () => {
    const modelo = ref('')
    const { aoDigitar } = useDocumento(modelo)

    aoDigitar({ target: { value: '529.982.247-25' } } as unknown as Event)
    expect(modelo.value).toBe('52998224725')

    aoDigitar({ target: { value: '12.ABC.345/01DE-35' } } as unknown as Event)
    expect(modelo.value).toBe('12ABC34501DE35')
  })
})
