<template>
  <div
    class="border border-borderColor-1 justify-between max-w-[782px] mx-auto"
  >
    <h3 class="text-2xl font-bold leading-8 p-4 border-b border-borderColor-1">
      {{ title }}
    </h3>

    <slot />

    <div v-if="!noBtn" class="w-full flex-center p-5 bg-gray-100">
      <BaseButton
        class="items-center"
        :text="$t('view_all')"
        size="large"
        icon-position="right"
        icon="icon-chevron"
        variant="secondary"
        @click="emit('change', tab || 'all')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<Props>()

interface Props {
  title: string
  link?: string
  noBtn?: boolean
  tab?: string
}

const emit = defineEmits<{
  (event: 'change', value: string): void
}>()
</script>

<style scoped>
.card:not(:last-child) {
  border-bottom: 1px solid #e3e4e8;
}
</style>
