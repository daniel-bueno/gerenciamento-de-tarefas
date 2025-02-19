<template>
  <div
      class="p-4 min-h-48 bg-zinc-700 rounded-lg shadow border-2 border-sky-300"
      :class="!selectedTask ? 'border-dashed flex items-center justify-center': 'border-solid'"
  >
    <div class="task-tree">
      <!-- Nó Principal -->
      <div class="task-node">
        <div
            class="flex items-center justify-between p-4 border rounded-lg"
            :class="{ 'completed': selectedTask.status === 'completed' }"
        >
          <div>
            <h3 class="font-medium text-white-87">{{ selectedTask.name }}</h3>
            <p v-if="selectedTask.description" class="text-sm text-gray-500">
              {{ selectedTask.description }}
            </p>
          </div>
          <BaseTag :variant="selectedTask.status">
            {{ getStatusLabel(selectedTask.status) }}
          </BaseTag>
        </div>

        <!-- Dependências Nível 1 -->
        <div v-if="childTasks.length" class="ml-8 mt-4 space-y-4">
          <div v-for="child in childTasks" :key="child.id" class="dependency-branch">
            <div class="task-node">
              <div
                  class="flex items-center justify-between p-4 border rounded-lg"
                  :class="{ 'completed': child.status === 'completed' }"
              >
                <div>
                  <h4 class="font-medium text-white-87">{{ child.name }}</h4>
                  <p v-if="child.description" class="text-sm text-gray-500">
                    {{ child.description }}
                  </p>
                </div>
                <BaseTag :variant="child.status">
                  {{ getStatusLabel(child.status) }}
                </BaseTag>
              </div>

              <!-- Dependências Nível 2 -->
              <div v-if="getChildTasks(child.id).length" class="ml-8 mt-4 space-y-4">
                <div
                    v-for="grandChild in getChildTasks(child.id)"
                    :key="grandChild.id"
                    class="dependency-branch"
                >
                  <div class="task-node">
                    <div
                        class="flex items-center justify-between p-4 border rounded-lg"
                        :class="{ 'completed': grandChild.status === 'completed' }"
                    >
                      <div>
                        <h5 class="font-medium text-white-87">{{ grandChild.name }}</h5>
                        <p v-if="grandChild.description" class="text-sm text-gray-500">
                          {{ grandChild.description }}
                        </p>
                      </div>
                      <BaseTag :variant="grandChild.status">
                        {{ getStatusLabel(grandChild.status) }}
                      </BaseTag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../../store/taskStore.js'
import { getStatusLabel } from '../../utils/taskUtils.js'
import BaseTag from '../atoms/BaseTag.vue'

export default {
  name: 'TaskDependencyTree',
  components: {
    BaseTag
  },
  setup() {
    const taskStore = useTaskStore()
    const { tasks, selectedTaskId } = storeToRefs(taskStore)

    const selectedTask = computed(() =>
        selectedTaskId.value ? taskStore.getTaskById(selectedTaskId.value) : null
    )

    const childTasks = computed(() => {
      if (!selectedTask.value) return []
      return tasks.value.filter(task => task.parentId === selectedTask.value.id)
    })

    const getChildTasks = (parentId) => {
      return tasks.value.filter(task => task.parentId === parentId)
    }

    return {
      selectedTask,
      childTasks,
      getChildTasks,
      getStatusLabel
    }
  }
}
</script>

<style scoped>
.task-tree {
  position: relative;
}

.dependency-branch {
  position: relative;
}

.dependency-branch::before {
  content: '';
  position: absolute;
  top: 0;
  left: -20px;
  height: 100%;
  width: 2px;
  background-color: #e5e7eb;
}

.dependency-branch::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -20px;
  width: 20px;
  height: 2px;
  background-color: #e5e7eb;
}

.task-node > .completed {
  @apply bg-green-100;
}

.task-node > .completed .text-white-87 {
  color: #166534 !important;
}
</style>