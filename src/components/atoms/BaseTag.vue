<template>
  <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      :class="[
      variant === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      variant === 'in_progress' ? 'bg-blue-100 text-blue-800' :
      variant === 'completed' ? 'bg-green-100 text-green-800' :
      'bg-gray-100 text-gray-800'
    ]"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'BaseTag',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['pending', 'in_progress', 'completed', 'default'].includes(value)
    }
  }
}
</script>