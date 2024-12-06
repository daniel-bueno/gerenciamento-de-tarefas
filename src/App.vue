<!--<template>-->
<!--  <div class="container mx-auto px-4 py-8">-->
<!--    <h1 class="text-3xl font-bold mb-8 text-center text-white-87">DBO - Gerenciamento de Tarefas</h1>-->

<!--    <div class="grid gap-6 lg:grid-cols-2">-->
<!--      <TaskBoard />-->
<!--      <TaskDependencyTree/>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import TaskBoard from './components/organisms/TaskBoard.vue'-->
<!--import TaskDependencyTree from './components/organisms/TaskDependencyTree.vue'-->

<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    TaskBoard,-->
<!--    TaskDependencyTree-->
<!--  },-->
<!--}-->
<!--</script>-->

<template>
  <TaskManagementTemplate />
</template>

<script>
import TaskManagementTemplate from './components/templates/TaskManagementTemplate.vue'

export default {
  name: 'App',
  components: {
    TaskManagementTemplate
  }
}
</script>