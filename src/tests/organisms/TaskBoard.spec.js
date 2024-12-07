import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TaskBoard from '../../components/organisms/TaskBoard.vue'
import { useTaskStore } from '../../store/taskStore'

describe('TaskBoard', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renderiza mensagem quando não há tarefas', () => {
        const wrapper = mount(TaskBoard)
        expect(wrapper.text()).toContain('Crie uma nova tarefa!')
    })

    it('filtra tarefas corretamente por status', async () => {
        const taskStore = useTaskStore()

        // Adiciona algumas tarefas
        taskStore.addTask({
            name: 'Task 1',
            status: 'pending'
        })
        taskStore.addTask({
            name: 'Task 2',
            status: 'completed'
        })

        const wrapper = mount(TaskBoard)
        // Simula filtro
        await wrapper.vm.handleFilter('completed')

        // Verifica se apenas tarefas concluídas são mostradas
        setTimeout(() => {
            expect(wrapper.findAll('.task-card')).toHaveLength(1)
            expect(wrapper.text()).toContain('Task 2')
        }, 500)
    })
})