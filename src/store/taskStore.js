import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        selectedTaskId: null
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

        // Obtém tarefas que podem ser parent (evita ciclos)
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
            // Verifica se há dependências
            const hasDependencies = this.tasks.some(task => task.parentId === taskId)
            if (hasDependencies) {
                throw new Error('Não é possível excluir uma tarefa que possui dependências')
            }
            this.tasks = this.tasks.filter(task => task.id !== taskId)
        },

        // Seleciona uma tarefa para visualização
        selectTask(taskId) {
            this.selectedTaskId = taskId
        },

        // Verifica se é possível adicionar mais um nível de dependência
        canAddDependency(parentId) {
            let depth = 0
            let current = this.tasks.find(t => t.id === parentId)

            while (current?.parentId) {
                depth++
                current = this.tasks.find(t => t.id === current.parentId)
            }

            return depth < 3
        }
    }
})