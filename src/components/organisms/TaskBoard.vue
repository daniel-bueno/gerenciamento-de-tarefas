<template>
  <div class="space-y-6">
    <!-- Seção de Filtros e Ações -->
    <div class="p-4 flex justify-between items-center gap-4 bg-zinc-700 rounded-lg">
      <BaseButton
          variant="primary"
          class="whitespace-nowrap"
          @click="isFormVisible = true"
      >
        Nova Tarefa +
      </BaseButton>
      <div class="border-2 h-28 border-gray-600"></div>
      <TaskFilter @filter="handleFilter" />
    </div>

    <!-- Modal de Formulário -->
    <div v-if="isFormVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div class="rounded-lg max-w-md w-full mx-4">
        <TaskForm
            :available-tasks="availableParentTasks"
            :task="editingTask"
            :is-editing="!!editingTask"
            @submit="handleTaskSubmit"
            @cancel="handleFormCancel"
        />
      </div>
    </div>

    <!-- Lista de Tarefas -->
    <div class="grid gap-4 md:grid-cols-2">
      <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @edit="handleEditTask"
          @delete="handleDeleteTask"
      />
      <div
          v-if="!tasks.length"
          class="min-h-36 rounded-lg border-dashed border-2 border-sky-300 flex items-center justify-center"
      >
          <p class="p-4 text-center text-gray-500">Crie uma nova tarefa!</p>
      </div>
      <div
          v-if="tasks.length < 2 && filteredTasks.length"
          class="min-h-36 rounded-lg border-dashed border-2 border-sky-300 flex items-center justify-center"
      >
        <p class="p-4 text-center text-gray-500">+</p>
      </div>

      <div
          v-if="!filteredTasks.length && tasks.length"
          class="col-span-2 min-h-36 rounded-lg border-dashed border-2 border-sky-300 flex items-center justify-center"
      >
        <p class="p-4 text-center text-gray-500">Nenhuma tarefa {{ selectedStatus ? `com o status ${getStatusLabel(selectedStatus)}` : '' }} encontrada.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../store/taskStore.js'
import { getStatusLabel } from '../../utils/taskUtils.js'
import TaskFilter from '../molecules/TaskFilter.vue'
import TaskForm from '../molecules/TaskForm.vue'
import TaskCard from '../molecules/TaskCard.vue'
import BaseButton from '../atoms/BaseButton.vue'

export default {
  name: 'TaskBoard',
  components: {
    TaskFilter,
    TaskForm,
    TaskCard,
    BaseButton
  },
  emits: ['update:tasks'],
  setup() {
    const isFormVisible = ref(false)
    const editingTask = ref(null)
    const selectedStatus = ref('')

    const taskStore = useTaskStore()
    const { tasks } = storeToRefs(taskStore)

    // Filtra tarefas baseado no status selecionado
    const filteredTasks = computed(() => {
      if (!selectedStatus.value) return tasks.value
      return tasks.value.filter(task => task.status === selectedStatus.value)
    })

    // Filtra tarefas disponíveis para serem tarefas pai
    const availableParentTasks = computed(() => {
      if (!editingTask.value) return tasks.value
      return tasks.value.filter(task => task.id !== editingTask.value.id)
    })

    const handleFilter = (status) => {
      selectedStatus.value = status
    }

    const handleTaskSubmit = (taskData) => {
      try {
        if (editingTask.value) {
          taskStore.updateTask(editingTask.value.id, taskData)
        } else {
          taskStore.addTask(taskData)
        }
        handleFormCancel()
      } catch (error) {
        alert(error.message)
      }
    }

    const handleEditTask = (task) => {
      editingTask.value = task
      isFormVisible.value = true
    }

    const handleDeleteTask = (task) => {
      try {
        taskStore.deleteTask(task.id)
      } catch (error) {
        alert(error.message)
      }
    }

    const handleFormCancel = () => {
      isFormVisible.value = false
      editingTask.value = null
    }

    return {
      tasks,
      isFormVisible,
      editingTask,
      filteredTasks,
      selectedStatus,
      availableParentTasks,
      getStatusLabel,
      handleFilter,
      handleTaskSubmit,
      handleEditTask,
      handleDeleteTask,
      handleFormCancel
    }
  }
}
</script>