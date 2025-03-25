<script setup lang="ts">
interface Props {
  step: number
  activeStep?: number
}
defineProps<Props>()
</script>

<template>
  <div
    class="w-9 h-9 md:w-[60px] md:h-[60px] border rounded-full text-xl md:text-2.5xl font-bold leading-130 flex-center shrink-0"
    :class="
      step <= activeStep
        ? 'bg-[linear-gradient(360deg,_#003B00_0%,_#33B34A_100%)] text-white border-green/[0.14]'
        : 'bg-green/[0.08] text-green border-green/10'
    "
  >
    {{ step }}
  </div>
</template>

<style scoped></style>
