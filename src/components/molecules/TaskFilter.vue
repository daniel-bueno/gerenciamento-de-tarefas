<template>
  <div class="flex flex-wrap gap-4 p-4 bg-zinc-700 rounded-lg">
    <BaseSelect
        id="status-filter"
        v-model="selectedStatus"
        label="Filtrar por Status"
        :options="statusOptions"
        placeholder="Todos os status"
        @update:modelValue="$emit('filter', selectedStatus)"
    />

    <div class="flex items-center gap-2">
      <BaseTag
          v-for="status in statusOptions"
          :key="status.value"
          :variant="status.value"
          class="cursor-pointer"
          @click="handleTagClick(status.value)"
      >
        {{ status.label }}
      </BaseTag>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseSelect from '../atoms/BaseSelect.vue'
import BaseTag from '../atoms/BaseTag.vue'

export default {
  name: 'TaskFilter',
  components: {
    BaseSelect,
    BaseTag
  },
  emits: ['filter'],
  setup({ emit }) {
    const selectedStatus = ref('')

    const statusOptions = [
      { value: 'pending', label: 'Pendente' },
      { value: 'in_progress', label: 'Em Andamento' },
      { value: 'completed', label: 'Concluído' }
    ]

    const handleTagClick = (status) => {
      selectedStatus.value = selectedStatus.value === status ? '' : status
      emit('filter', selectedStatus.value)
    }

    return {
      selectedStatus,
      statusOptions,
      handleTagClick
    }
  }
}
</script>