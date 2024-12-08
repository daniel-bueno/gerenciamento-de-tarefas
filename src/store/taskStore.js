import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        selectedTaskId: null,
        editingTask: null,
        isModalOpen: false
    }),

    getters: {
        // Obtém tarefa por ID
        getTaskById: (state) => (id) => {
            return state.tasks.find(task => task.id === id)
        },

        // Obtém tarefas filtradas por status
        getTasksByStatus: (state) => (status) => {
            if (!status) return state.tasks
            return state.tasks.filter(task => task.status === status)
        },

        // Obtém tarefas que podem ser parentes da tarefa especificada
        getAvailableParentTasks: (state) => (taskId) => {
            return state.tasks.filter(task => {
                // Não pode ser a própria tarefa
                if (task.id === taskId) return false
                // Não pode ser uma tarefa que já é dependente
                if (task.parentId === taskId) return false
                // Não pode criar ciclos de dependência
                let current = task
                while (current.parentId) {
                    if (current.parentId === taskId) return false
                    current = state.tasks.find(t => t.id === current.parentId)
                }
                return true
            })
        },

        // Verifica se uma tarefa pode ser marcada como concluída
        canCompleteTask: (state) => (taskId) => {
            const dependentTasks = state.tasks.filter(task => task.parentId === taskId)
            return dependentTasks.every(task => task.status === 'completed')
        }
    },

    actions: {
        // Adiciona uma nova tarefa
        addTask(taskData) {
            const newTask = {
                id: Date.now().toString(),
                name: taskData.name,
                description: taskData.description || '',
                status: taskData.status || 'pending',
                parentId: taskData.parentId || null,
                createdAt: new Date().toISOString()
            }
            this.tasks.push(newTask)
        },

        // Atualiza uma tarefa existente
        updateTask(taskId, updates) {
            const index = this.tasks.findIndex(task => task.id === taskId)
            if (index !== -1) {
                const currentTask = this.tasks[index]

                // Se a tarefa já estava concluída, permite alterar os dados
                // Se houver dependências pendentes e o status não era como concluída, não permite alterar.
                if (currentTask.status !== 'completed' && updates.status === 'completed' && !this.canCompleteTask(taskId)) {
                    throw new Error('Não é possível concluir esta tarefa pois há dependências pendentes')
                }
                this.tasks[index] = { ...this.tasks[index], ...updates }
            }
        },

        // Remove uma tarefa
        deleteTask(taskId) {
            const hasDependencies = this.tasks.some(task => task.parentId === taskId)
            if (hasDependencies) {
                throw new Error('Não é possível excluir uma tarefa que possui dependências')
            }
            if (this.selectedTaskId === taskId) {
                this.selectedTaskId = null
            }
            this.tasks = this.tasks.filter(task => task.id !== taskId)
        },

        // Seleciona uma tarefa para visualização
        selectTask(taskId) {
            this.selectedTaskId = taskId
        },

        // Abre o modal para criar ou editar uma tarefa
        openModal(task = null) {
            this.editingTask = task
            this.isModalOpen = true
        },

        // Fecha o modal
        closeModal() {
            this.editingTask = null
            this.isModalOpen = false
        },
    }
})