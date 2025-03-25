<template>
  <div
    class="grid grid-cols-[1fr_max-content_1fr] justify-center gap-7 max-w-[874px] min-h-[210px] items-center"
  >
    <ScholarshipCardStepInfo v-bind="{ reverse, step: data }" />
    <div class="flex-y-center flex-col gap-2 h-full">
      <hr
        v-if="isCenter"
        class="w-px border-none h-full"
        :class="step <= activeStep ? 'bg-green' : 'bg-gray-200'"
      />
      <ScholarshipCardStepNumber v-bind="{ activeStep, step }" />
      <hr
        class="w-px border-none h-full"
        :class="step < activeStep ? 'bg-green' : 'bg-gray-200'"
      />
    </div>
    <div :class="{ 'order-first': reverse }" />
  </div>
</template>

<script setup lang="ts">
import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  step: number
  activeStep?: number
  reverse?: boolean
  isCenter?: boolean
  data?: IEnrollmentSteps
}
withDefaults(defineProps<Props>(), {
  activeStep: 1,
})
</script>
