<script setup lang="ts">
interface Props {
  modelValue: boolean
  isTransparent?: boolean
}
defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const scrollTop = ref(0)

const checkSticky = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  return scrollTop.value > 0
}

window.addEventListener('scroll', () => {
  shouldStick.value = checkSticky()
})
const shouldStick = ref(checkSticky())
</script>

<template>
  <transition name="fade-sm" mode="out-in">
    <button
      v-if="!modelValue"
      class="icon-burger text-gray-1 text-2.5xl leading-7 transition-300 xl:hidden"
      :class="{ '!text-gray-1': !isTransparent, '!text-gray-1': shouldStick }"
      @click="$emit('update:modelValue', true)"
    />
    <button
      v-else
      class="icon-x-mark text-gray-1 text-2.5xl leading-7 transition-300 xl:hidden"
      :class="{ '!text-gray-1': !isTransparent }"
      @click="$emit('update:modelValue', false)"
    />
  </transition>
</template>

<style scoped></style>
