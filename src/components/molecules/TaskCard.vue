<template>
  <div
      class="bg-zinc-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
      @click="handleTaskSelect"
  >
    <div class="flex items-start justify-between">
      <div>
        <h3 class="font-medium text-black-950">{{ task.name }}</h3>
        <p v-if="task.description" class="mt-1 text-sm text-gray-500">
          {{ task.description }}
        </p>
      </div>
      <BaseTag :variant="task.status">
        {{ statusLabel }}
      </BaseTag>
    </div>

    <div v-if="task.parentTask" class="mt-2">
      <span class="text-xs text-gray-500">Tarefa Principal:</span>
      <span class="text-xs font-medium text-gray-700 ml-1">{{ task.parentTask.name }}</span>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <BaseButton
          variant="default"
          size="sm"
          @click.stop="$emit('edit', task)"
      >
        Editar
      </BaseButton>
      <BaseButton
          variant="danger"
          size="sm"
          @click.stop="handleDelete"
      >
        Excluir
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTaskStore } from '../../store/taskStore.js'
import BaseTag from '../atoms/BaseTag.vue'
import BaseButton from '../atoms/BaseButton.vue'

export default {
  name: 'TaskCard',
  components: {
    BaseTag,
    BaseButton
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const taskStore = useTaskStore()

    const statusLabel = computed(() => {
      const labels = {
        pending: 'Pendente',
        in_progress: 'Em Andamento',
        completed: 'Concluído'
      }
      return labels[props.task.status] || props.task.status
    })

    const handleDelete = () => {
      if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        emit('delete', props.task)
      }
    }

    const handleTaskSelect = () => {
      taskStore.selectTask(props.task.id)
    }

    return {
      statusLabel,
      handleDelete,
      handleTaskSelect
    }
  }
}
</script>