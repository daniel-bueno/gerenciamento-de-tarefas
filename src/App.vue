<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">DBO - Gerenciamento de Tarefas</h1>

    <div class="space-y-4 max-w-md">
      <BaseInput
          id="task-name"
          v-model="taskName"
          label="Nome da Tarefa"
          placeholder="Digite o nome da tarefa"
          required
      />

      <BaseSelect
          id="task-status"
          v-model="taskStatus"
          label="Status"
          :options="statusOptions"
          placeholder="Selecione o status"
      />

      <div>
        <i class="block text-sm font-medium text-gray-400 mb-1">Legenda:</i>
        <div class="flex gap-2">
          <BaseTag variant="pending">Pendente</BaseTag>
          <BaseTag variant="in_progress">Em Andamento</BaseTag>
          <BaseTag variant="completed">Concluído</BaseTag>
        </div>
      </div>
    </div>

    <BaseButton variant="primary" class="mt-10">
      {{ (isEditing ? 'Editar' : 'Criar') + ' Tarefa' }}
    </BaseButton>
  </div>
</template>

<script>
import BaseInput from './components/atoms/BaseInput.vue'
import BaseSelect from './components/atoms/BaseSelect.vue'
import BaseTag from './components/atoms/BaseTag.vue'
import BaseButton from './components/atoms/BaseButton.vue'

export default {
  name: 'App',
  components: {
    BaseInput,
    BaseSelect,
    BaseTag,
    BaseButton
  },
  data() {
    return {
      taskName: '',
      taskStatus: '',
      statusOptions: [
        {value: 'pending', label: 'Pendente'},
        {value: 'in_progress', label: 'Em Andamento'},
        {value: 'completed', label: 'Concluído'}
      ]
    }
  }
}
</script>