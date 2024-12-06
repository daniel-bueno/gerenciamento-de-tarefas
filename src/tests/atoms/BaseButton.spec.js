import { mount } from '@vue/test-utils'
import BaseButton from '../../components/atoms/BaseButton.vue'

describe('BaseButton', () => {
    it('renderiza o conteúdo do slot', () => {
        const wrapper = mount(BaseButton, {
            slots: {
                default: 'Test Button'
            }
        })
        expect(wrapper.text()).toBe('Test Button')
    })

    it('aplica a classe correta baseado na variante', () => {
        const variants = {
            primary: 'bg-blue-500',
            danger: 'bg-red-500',
            default: 'bg-gray-200'
        }

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            const wrapper = mount(BaseButton, {
                props: { variant }
            })
            expect(wrapper.classes()).toContain(expectedClass)
        })
    })

    it('emite evento de click quando clicado', async () => {
        const wrapper = mount(BaseButton)
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('não emite evento quando desabilitado', async () => {
        const wrapper = mount(BaseButton, {
            props: {
                disabled: true
            }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })
})