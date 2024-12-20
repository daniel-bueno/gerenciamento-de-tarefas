<template>
  <button
      :class="[
      'rounded-md font-medium transition-colors',
      variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
      variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
      'bg-gray-200 text-gray-700 hover:bg-gray-300',
      size === 'sm' ? 'px-2 py-1 text-sm' :
      size === 'lg' ? 'px-6 py-3 text-lg' :
      'px-4 py-2 text-md'
    ]"
      :disabled="disabled"
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
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    }
  },
}
</script>