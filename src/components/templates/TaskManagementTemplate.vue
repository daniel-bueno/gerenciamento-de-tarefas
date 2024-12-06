<template>
  <div class="min-h-screen bg-gray-100 rounded-lg">
    <!-- Header -->
    <header class="bg-white shadow rounded-t-lg">
      <div class="container px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">
            DBO - Gerenciamento de Tarefas
          </h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-500">
              Total de Tarefas: {{ totalTasks }}
            </span>
            <BaseButton
                variant="primary"
                @click="handleTaskCreate"
            >
              Nova Tarefa
            </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <!-- Task Board Section -->
        <TaskBoard />

        <!-- Task Dependencies Section -->
        <aside class="space-y-6 min-w-96">
          <TaskDependencyTree v-if="selectedTaskId" />
          <div v-else class="min-h-48 bg-white rounded-lg shadow p-6 text-center text-gray-500">
            Selecione uma tarefa para visualizar suas dependências
          </div>
        </aside>
      </div>
    </main>

    <!-- Task Form Modal -->
    <div v-if="isModalOpen"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingTask ? 'Editar Tarefa' : 'Nova Tarefa' }}
          </h2>
          <TaskForm
              :task="editingTask || {}"
              :is-editing="!!editingTask"
              :available-tasks="availableTasks"
              @submit="handleTaskSubmit"
              @cancel="handleTaskCancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../store/taskStore.js'
import BaseButton from '../atoms/BaseButton.vue'
import TaskBoard from '../organisms/TaskBoard.vue'
import TaskDependencyTree from '../organisms/TaskDependencyTree.vue'
import TaskForm from '../molecules/TaskForm.vue'

export default {
  name: 'TaskManagementTemplate',
  components: {
    BaseButton,
    TaskBoard,
    TaskDependencyTree,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore()
    const { tasks, selectedTaskId, editingTask, isModalOpen  } = storeToRefs(taskStore)

    const totalTasks = computed(() => tasks.value.length)

    // Obtemos as tarefas disponíveis para serem parent
    const availableTasks = computed(() =>
        taskStore.getAvailableParentTasks(editingTask.value?.id)
    )

    const handleTaskCreate = () => {
      taskStore.openModal()
    }

    const handleTaskSubmit = (taskData) => {
      if (editingTask.value) {
        taskStore.updateTask(editingTask.value.id, taskData)
      } else {
        taskStore.addTask(taskData)
      }
      taskStore.closeModal()
    }

    const handleTaskCancel = () => {
      taskStore.closeModal()
    }

    return {
      taskStore,
      editingTask,
      selectedTaskId,
      isModalOpen,
      totalTasks,
      availableTasks,
      handleTaskSubmit,
      handleTaskCreate,
      handleTaskCancel
    }
  }
}
</script>