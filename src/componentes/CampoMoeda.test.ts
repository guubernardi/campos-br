import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CampoMoeda from './CampoMoeda.vue'

describe('CampoMoeda', () => {
  it('digitar atualiza o v-model com centavos e exibe o valor mascarado', async () => {
    const wrapper = mount(CampoMoeda, { props: { modelValue: 0 } })
    const input = wrapper.find('input')

    await input.setValue('123456')

    // O v-model recebe centavos inteiros.
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([123456])
    // O input exibe o valor mascarado.
    expect((input.element as HTMLInputElement).value).toBe('R$ 1.234,56')
  })

  it('mostra erro quando obrigatório e vazio após o blur, e atualiza v-model:valido', async () => {
    const wrapper = mount(CampoMoeda, { props: { modelValue: 0, obrigatorio: true } })
    const input = wrapper.find('input')

    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)

    await input.trigger('blur')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(true)
    expect(wrapper.classes()).toContain('campos-br-campo--erro')

    await input.setValue('100')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)
    expect(wrapper.emitted('update:valido')?.at(-1)).toEqual([true])
  })
})
