import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useMoeda } from './useMoeda'

describe('useMoeda', () => {
  it('reage à mudança do modelo com máscara e validade', () => {
    const modelo = ref(0)
    const { mascarado, valido } = useMoeda(modelo)

    expect(mascarado.value).toBe('R$ 0,00')
    expect(valido.value).toBe(false)

    modelo.value = 123456
    expect(mascarado.value).toBe('R$ 1.234,56')
    expect(valido.value).toBe(true)
  })

  it('aoDigitar converte o texto em centavos e grava no modelo', () => {
    const modelo = ref(0)
    const { aoDigitar } = useMoeda(modelo)

    aoDigitar({ target: { value: 'R$ 1.234,56' } } as unknown as Event)
    expect(modelo.value).toBe(123456)
  })
})
