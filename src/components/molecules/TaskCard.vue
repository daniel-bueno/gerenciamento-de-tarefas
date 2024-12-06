<template>
  <div
      class="flex flex-col justify-between bg-zinc-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
      @click="handleTaskSelect"
  >
    <div class="flex flex-col items-start gap-1">
      <BaseTag :variant="task.status">
        {{ statusLabel }}
      </BaseTag>
      <div>
        <h3 class="font-medium text-white-87">{{ task.name }}</h3>
        <p v-if="task.description" class="mt-1 text-sm text-gray-500">
          {{ task.description }}
        </p>
      </div>
    </div>

    <div v-if="parentTask" class="mt-2">
      <hr class="border-gray-400">
      <span class="text-xs text-gray-400">Tarefa Principal:</span>
      <span class="text-xs font-medium text-gray-500 ml-1">{{ parentTask.name }}</span>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <BaseButton
          variant="default"
          size="sm"
          @click="$emit('edit', task)"
      >
        Editar
      </BaseButton>
      <BaseButton
          variant="danger"
          size="sm"
          @click="handleDelete"
      >
        Excluir
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTaskStore } from '../../store/taskStore.js'
import { getStatusLabel } from '../../utils/taskUtils.js'
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
  setup(props, { emit }) {
    const taskStore = useTaskStore()

    const statusLabel = computed(() => getStatusLabel(props.task.status))

    // Pegamos a tarefa pai aqui
    const parentTask = computed(() => {
      if (!props.task.parentId) return null
      return taskStore.getTaskById(props.task.parentId)
    })

    const handleDelete = (event) => {
      event.stopPropagation()

      const shouldDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?')
      if (shouldDelete) {
        emit('delete', props.task)
      }
    }

    const handleTaskSelect = () => {
      taskStore.selectTask(props.task.id)
    }

    return {
      parentTask,
      statusLabel,
      handleDelete,
      handleTaskSelect
    }
  }
}
</script>