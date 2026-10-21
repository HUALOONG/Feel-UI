<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariants, type ButtonProps } from './button'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
})

const classes = computed(() => buttonVariants({ variant: props.variant, size: props.size, className: props.class }))
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
