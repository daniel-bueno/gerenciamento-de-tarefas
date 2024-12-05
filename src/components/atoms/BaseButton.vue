<template>
  <button
      :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
      variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
      'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]"
      :disabled="disabled"
      @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['primary', 'danger', 'default'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>