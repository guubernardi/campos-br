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

  it('aceita o CNPJ alfanumérico digitado caractere a caractere', async () => {
    const wrapper = mount(CampoDocumento, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    const el = input.element as HTMLInputElement

    // Simula a digitação real: cada tecla é acrescentada ao que está na tela.
    for (const caractere of '12abc34501de35') {
      await input.setValue(el.value + caractere)
      await wrapper.setProps({ modelValue: wrapper.emitted('update:modelValue')?.at(-1)?.[0] as string })
    }

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['12ABC34501DE35'])
    expect(el.value).toBe('12.ABC.345/01DE-35')
    expect(wrapper.emitted('update:valido')?.at(-1)).toEqual([true])
  })

  it('descarta o caractere fantasma (além do limite ou letra nos verificadores)', async () => {
    const wrapper = mount(CampoDocumento, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    // Letra nas posições dos dígitos verificadores não entra.
    await input.setValue('12.ABC.345/01DE-3X')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['12ABC34501DE3'])
    expect((input.element as HTMLInputElement).value).toBe('12.ABC.345/01DE-3')

    // Caracteres além do 14º não entram.
    await input.setValue('11.222.333/0001-819')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['11222333000181'])
    expect((input.element as HTMLInputElement).value).toBe('11.222.333/0001-81')
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
