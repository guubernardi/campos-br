import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CampoTelefone from './CampoTelefone.vue'

describe('CampoTelefone', () => {
  it('digitar atualiza o v-model com o valor limpo e exibe o mascarado', async () => {
    const wrapper = mount(CampoTelefone, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('(11) 99999-8888')

    // O v-model recebe apenas dígitos.
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['11999998888'])
    // O input exibe o valor mascarado.
    expect((input.element as HTMLInputElement).value).toBe('(11) 99999-8888')
  })

  it('mostra o erro quando inválido após o primeiro blur e atualiza v-model:valido', async () => {
    const wrapper = mount(CampoTelefone, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('1199')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)

    await input.trigger('blur')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(true)
    expect(wrapper.classes()).toContain('campos-br-campo--erro')

    await input.setValue('(11) 3333-4444')
    expect(wrapper.find('.campos-br-campo__erro').exists()).toBe(false)
    expect(wrapper.emitted('update:valido')?.at(-1)).toEqual([true])
  })
})
