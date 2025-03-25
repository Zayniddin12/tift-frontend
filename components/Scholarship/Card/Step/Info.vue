<script setup lang="ts">
import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  reverse?: boolean
  step?: IEnrollmentSteps
  isMobileSteps?: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="border bg-gray-4 border-gray-200 p-3 md:p-5 flex flex-col gap-5 h-max"
    :class="[
      reverse ? 'text-left items-start order-last' : 'items-end text-right',
      { '!items-start !text-left': isMobileSteps },
    ]"
  >
    <img
      v-if="step?.icon"
      :src="step?.icon"
      class="w-12 h-12 md:max-w-12 md:max-h-12 object-cover"
      alt="icon of step"
    />
    <div>
      <h3 class="text-lg font-semibold text-dark leading-130 mb-2">
        {{ step?.title }}
      </h3>
      <p class="text-sm font-normal text-gray-1 leading-140">
        {{ step?.body }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
