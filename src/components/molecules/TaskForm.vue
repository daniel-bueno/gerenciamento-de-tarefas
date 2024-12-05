<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 p-4 bg-zinc-700 rounded-lg shadow">
    <BaseInput
        id="task-name"
        v-model="formData.name"
        label="Nome da Tarefa"
        placeholder="Digite o nome da tarefa"
        required
        :error="errors.name"
    />

    <BaseInput
        id="task-description"
        v-model="formData.description"
        label="Descrição"
        placeholder="Digite a descrição da tarefa"
        type="textarea"
    />

    <BaseSelect
        id="task-status"
        v-model="formData.status"
        label="Status"
        :options="statusOptions"
        placeholder="Selecione o status"
        required
        :error="errors.status"
    />

    <BaseSelect
        v-if="!isEditing && availableTasks.length"
        id="task-parent"
        v-model="formData.parentId"
        label="Tarefa Principal"
        :options="formattedAvailableTasks"
        placeholder="Selecione a tarefa principal (opcional)"
    />

    <div class="flex justify-end gap-2">
      <BaseButton variant="default" type="button" @click="$emit('cancel')">
        Cancelar
      </BaseButton>
      <BaseButton variant="primary" type="submit">
        {{ isEditing ? 'Atualizar' : 'Criar' }} Tarefa
      </BaseButton>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseSelect from '../atoms/BaseSelect.vue'
import BaseButton from '../atoms/BaseButton.vue'

export default {
  name: 'TaskForm',
  components: {
    BaseInput,
    BaseSelect,
    BaseButton
  },
  props: {
    task: {
      type: Array,
      default: () => ([])
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    availableTasks: {
      type: Array,
      default: () => []
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      name: props.task?.name || '',
      description: props.task?.description || '',
      status: props.task?.status || '',
      parentId: props.task?.parentId || null
    })

    const errors = ref({})

    const statusOptions = [
      { value: 'pending', label: 'Pendente' },
      { value: 'in_progress', label: 'Em Andamento' },
      { value: 'completed', label: 'Concluído' }
    ]

    const formattedAvailableTasks = computed(() => {
      return props.availableTasks.map(task => ({
        value: task.id,
        label: task.name
      }))
    })

    const validateForm = () => {
      errors.value = {}
      if (!formData.value.name?.trim()) {
        errors.value.name = 'Nome é obrigatório'
      }
      if (!formData.value.status) {
        errors.value.status = 'Status é obrigatório'
      }
      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = () => {
      if (validateForm()) {
        emit('submit', { ...formData.value })
      }
    }

    return {
      formData,
      errors,
      statusOptions,
      formattedAvailableTasks,
      handleSubmit
    }
  }
}
</script>