import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useCep } from './useCep'
import type { Endereco } from '../utils/buscarCep'

const enderecoFake: Endereco = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  estado: 'SP',
}

describe('useCep', () => {
  it('reage à mudança do modelo com máscara e validade', () => {
    const modelo = ref('')
    const { mascarado, valido } = useCep(modelo)

    expect(valido.value).toBe(false)

    modelo.value = '01310100'
    expect(mascarado.value).toBe('01310-100')
    expect(valido.value).toBe(true)
  })

  it('aoDigitar limpa e grava o valor no modelo', () => {
    const modelo = ref('')
    const { aoDigitar } = useCep(modelo)

    aoDigitar({ target: { value: '01310-100' } } as unknown as Event)
    expect(modelo.value).toBe('01310100')
  })

  it('busca com sucesso: alterna carregando e popula endereco', async () => {
    const modelo = ref('01310100')

    // Promise controlável para observar o estado de carregamento.
    let resolver!: (valor: Endereco) => void
    const pendente = new Promise<Endereco>((res) => {
      resolver = res
    })
    const buscarEndereco = vi.fn(() => pendente)

    const { buscar, endereco, carregando, erro } = useCep(modelo, { buscarEndereco })

    expect(carregando.value).toBe(false)

    const promessa = buscar()
    expect(carregando.value).toBe(true)
    expect(buscarEndereco).toHaveBeenCalledWith('01310100')

    resolver(enderecoFake)
    await promessa

    expect(carregando.value).toBe(false)
    expect(endereco.value).toEqual(enderecoFake)
    expect(erro.value).toBeNull()
  })

  it('busca com falha: preenche erro e limpa endereco', async () => {
    const modelo = ref('00000000')
    const buscarEndereco = vi.fn(() => Promise.reject(new Error('CEP não encontrado')))

    const { buscar, endereco, carregando, erro } = useCep(modelo, { buscarEndereco })

    await buscar()

    expect(carregando.value).toBe(false)
    expect(endereco.value).toBeNull()
    expect(erro.value).toBe('CEP não encontrado')
  })
})
