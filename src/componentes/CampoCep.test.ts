import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import CampoCep from './CampoCep.vue'
import type { Endereco } from '../utils/buscarCep'

const enderecoFake: Endereco = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  estado: 'SP',
}

describe('CampoCep', () => {
  it('digitar atualiza o v-model com o valor limpo e exibe o mascarado', async () => {
    const buscarEndereco = vi.fn(() => Promise.resolve(enderecoFake))
    const wrapper = mount(CampoCep, { props: { modelValue: '', buscarEndereco } })
    const input = wrapper.find('input')

    await input.setValue('01310-100')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['01310100'])
    expect((input.element as HTMLInputElement).value).toBe('01310-100')
  })

  it('dispara a busca ao completar o CEP e emite endereco-encontrado', async () => {
    const buscarEndereco = vi.fn(() => Promise.resolve(enderecoFake))
    const wrapper = mount(CampoCep, { props: { modelValue: '', buscarEndereco } })
    const input = wrapper.find('input')

    await input.setValue('01310100')
    await flushPromises()

    // Busca disparada com o CEP limpo, sem requisição de rede.
    expect(buscarEndereco).toHaveBeenCalledWith('01310100')
    expect(wrapper.emitted('endereco-encontrado')?.at(-1)).toEqual([enderecoFake])
  })

  it('não dispara a busca enquanto o CEP estiver incompleto', async () => {
    const buscarEndereco = vi.fn(() => Promise.resolve(enderecoFake))
    const wrapper = mount(CampoCep, { props: { modelValue: '', buscarEndereco } })
    const input = wrapper.find('input')

    await input.setValue('0131010')
    await flushPromises()

    expect(buscarEndereco).not.toHaveBeenCalled()

    await input.trigger('blur')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(true)
  })
})
