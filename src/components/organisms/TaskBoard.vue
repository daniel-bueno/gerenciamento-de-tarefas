<template>
  <div class="space-y-6">
    <!-- Seção de Filtros e Ações -->
    <div class="gap-4 bg-white rounded-lg shadow text-gray-500">
      <TaskFilter @filter="handleFilter" />
    </div>

    <!-- Lista de Tarefas -->
    <div class="grid gap-4 md:grid-cols-2">
      <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
      />
      <div
          v-if="!tasks.length"
          class="col-span-2 rounded-lg border-dashed border-2 border-sky-300 flex items-center justify-center"
      >
          <p class="p-4 text-center text-gray-500">Crie uma nova tarefa!</p>
      </div>

      <div
          v-if="!filteredTasks.length && tasks.length"
          class="col-span-2 rounded-lg border-dashed border-2 border-sky-300 flex items-center justify-center"
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
    const taskStore = useTaskStore()
    const { tasks } = storeToRefs(taskStore)
    const selectedStatus = ref('')

    // Filtra tarefas baseado no status selecionado
    const filteredTasks = computed(() => {
      if (!selectedStatus.value) return tasks.value
      return tasks.value.filter(task => task.status === selectedStatus.value)
    })

    const handleFilter = (status) => {
      selectedStatus.value = status
    }

    return {
      tasks,
      filteredTasks,
      selectedStatus,
      getStatusLabel,
      handleFilter,
    }
  }
}
</script>