import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CampoDocumento from './CampoDocumento.vue'

describe('CampoDocumento', () => {
  it('digitar atualiza o v-model com o valor limpo e exibe o mascarado', async () => {
    const wrapper = mount(CampoDocumento, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('529.982.247-25')

    // O v-model recebe apenas dígitos.
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['52998224725'])
    // O input exibe o valor mascarado.
    expect((input.element as HTMLInputElement).value).toBe('529.982.247-25')
  })

  it('descarta o caractere fantasma (letra digitada num CPF)', async () => {
    const wrapper = mount(CampoDocumento, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('52998224a')

    // A letra não altera o valor limpo nem fica visível.
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['52998224'])
    expect((input.element as HTMLInputElement).value).toBe('529.982.24')
  })

  it('mostra o erro quando inválido após o primeiro blur e atualiza v-model:valido', async () => {
    const wrapper = mount(CampoDocumento, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('123')
    // Antes do blur, sem mensagem de erro.
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)

    await input.trigger('blur')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(true)
    expect(wrapper.classes()).toContain('campos-br-campo--erro')

    // Completar com CPF válido limpa o erro e marca como válido.
    await input.setValue('529.982.247-25')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)
    expect(wrapper.emitted('update:valido')?.at(-1)).toEqual([true])
  })
})
