<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center text-white-87">DBO - Gerenciamento de Tarefas</h1>

    <div class="space-y-6">
      <TaskFilter @filter="handleFilter" />

      <TaskForm
          :available-tasks="tasks"
          @submit="handleTaskSubmit"
          @cancel="isFormVisible = false"
      />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @edit="handleEditTask"
            @delete="handleDeleteTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import TaskFilter from './components/molecules/TaskFilter.vue'
import TaskForm from './components/molecules/TaskForm.vue'
import TaskCard from './components/molecules/TaskCard.vue'
import BaseButton from './components/atoms/BaseButton.vue'

export default {
  name: 'App',
  components: {
    TaskFilter,
    TaskForm,
    TaskCard,
    BaseButton
  },
  setup() {
    const tasks = ref([])
    const selectedStatus = ref('')
    const isFormVisible = ref(true)

    const filteredTasks = computed(() => {
      if (!selectedStatus.value) return tasks.value
      return tasks.value.filter(task => task.status === selectedStatus.value)
    })

    const handleFilter = (status) => {
      selectedStatus.value = status
    }

    const handleTaskSubmit = (taskData) => {
      const newTask = {
        id: Date.now().toString(),
        ...taskData
      }
      tasks.value.push(newTask)
      isFormVisible.value = false
    }

    const handleEditTask = (task) => {
      // Implementar edição
    }

    const handleDeleteTask = (task) => {
      tasks.value = tasks.value.filter(t => t.id !== task.id)
    }

    return {
      tasks,
      filteredTasks,
      isFormVisible,
      handleFilter,
      handleTaskSubmit,
      handleEditTask,
      handleDeleteTask
    }
  }
}
</script>