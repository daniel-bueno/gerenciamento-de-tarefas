import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TaskCard from '../../components/molecules/TaskCard.vue'
import { useTaskStore } from '../../store/taskStore'

describe('TaskCard', () => {
    let taskStore;

    beforeEach(() => {
        setActivePinia(createPinia())
        taskStore = useTaskStore()
    })

    const createWrapper = (taskProps = {}) => {
        return mount(TaskCard, {
            props: {
                task: {
                    id: '1',
                    name: 'Test Task',
                    description: 'Test Description',
                    status: 'pending',
                    ...taskProps
                }
            },
            global: {
                plugins: [createPinia()]
            }
        })
    }

    it('renderiza os detalhes da tarefa corretamente', () => {
        const wrapper = createWrapper()
        expect(wrapper.text()).toContain('Test Task')
        expect(wrapper.text()).toContain('Test Description')
        expect(wrapper.text()).toContain('Pendente')
    })

    it('mostra a tarefa pai quando existir', async () => {
        // Primeiro adiciona a tarefa pai
        taskStore.addTask({
            name: 'Parent Task',
            status: 'pending'
        })

        // Aguarda a próxima atualização do DOM
        const wrapper = createWrapper({
            parentId: taskStore.tasks[0].id
        })

        // Verifica se o texto da tarefa pai está sendo exibido
        setTimeout(() => {
            const parentTaskElement = wrapper.find('[data-test="parent-task"]')
            expect(parentTaskElement.exists()).toBe(true)
            expect(parentTaskElement.text()).toContain('Parent Task')
        }, 500)
    })

    it('chama store.deleteTask ao confirmar exclusão', async () => {
        const wrapper = createWrapper()

        // Mock da confirmação
        window.confirm = jest.fn(() => true)

        await wrapper.find('button:last-child').trigger('click')
        expect(window.confirm).toHaveBeenCalled()
    })
})