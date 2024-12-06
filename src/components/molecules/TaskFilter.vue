<template>
  <div class="p-6 flex flex-wrap justify-between gap-4 rounded-lg">
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
import { STATUS_OPTIONS } from '../../utils/taskUtils.js'
import BaseSelect from '../atoms/BaseSelect.vue'
import BaseTag from '../atoms/BaseTag.vue'

export default {
  name: 'TaskFilter',
  components: {
    BaseSelect,
    BaseTag
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const selectedStatus = ref('')

    const handleTagClick = (status) => {
      selectedStatus.value = selectedStatus.value === status ? '' : status
      emit('filter', selectedStatus.value)
    }

    return {
      selectedStatus,
      statusOptions: STATUS_OPTIONS,
      handleTagClick
    }
  }
}
</script>