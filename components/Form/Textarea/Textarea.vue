<template>
  <div
    class="bg-gray-4 border border-gray-5 transition-300 focus-within:border-red focus-within:bg-white flex items-center gap-3 px-4 py-3"
    :class="{ '!border-red': error }"
  >
    <slot name="prefix" />
    <textarea
      v-bind="{
        id,
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
      }"
      :id="inputId"
      ref="Input"
      :rows="rows"
      class="w-full h-full text-base sm:text-sm caret-red font-medium bg-transparent outline-none text-dark placeholder:text-gray-2 resize-none"
      :value="modelValue"
      :class="[inputClass]"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    ></textarea>
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import type { TClassName } from '~/types'

export interface Props {
  id?: string
  type?: string
  placeholder?: string
  modelValue: number | string
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: TClassName
  suffixClass?: TClassName
  autocomplete?: string
  inputId?: string
  readonly?: boolean
  rows?: number
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  modelValue: '',
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
})

const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true }
)
</script>
