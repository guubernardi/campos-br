import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useTelefone } from './useTelefone'

describe('useTelefone', () => {
  it('reage à mudança do modelo com máscara e validade', () => {
    const modelo = ref('')
    const { mascarado, valido } = useTelefone(modelo)

    expect(mascarado.value).toBe('')
    expect(valido.value).toBe(false)

    modelo.value = '1133334444'
    expect(mascarado.value).toBe('(11) 3333-4444')
    expect(valido.value).toBe(true)

    modelo.value = '11999998888'
    expect(mascarado.value).toBe('(11) 99999-8888')
    expect(valido.value).toBe(true)

    modelo.value = '119999'
    expect(valido.value).toBe(false)
  })

  it('aoDigitar limpa e grava o valor no modelo', () => {
    const modelo = ref('')
    const { aoDigitar } = useTelefone(modelo)

    aoDigitar({ target: { value: '(11) 99999-8888' } } as unknown as Event)
    expect(modelo.value).toBe('11999998888')
  })
})
