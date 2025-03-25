<script setup lang="ts">
interface Props {
  title?: string
  views?: number
  isShowEye?: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="hidden-print flex-center-between max-md:items-stretch max-md:flex-col-reverse pt-6 border-t border-[#E9EBEE] gap-3"
  >
    <div class="flex flex-wrap flex-col md:flex-row w-full gap-4 md:gap-6">
      <CommonButtonShare v-bind="{ title }" />
      <CommonButtonCopy class="max-w-full md:max-w-[240px]" />
    </div>
    <div
      class="flex w-full md:w-auto gap-4 text-dark text-sm font-semibold leading-130"
    >
      <div v-if="!isShowEye" class="flex-y-center gap-2">
        <i class="icon-eye text-xl leading-5 text-gray-1" />
        {{ views }}
      </div>
      <CommonButtonPrint />
    </div>
  </div>
</template>

<style scoped></style>
