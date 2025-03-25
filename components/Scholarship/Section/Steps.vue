<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  steps: IEnrollmentSteps[]
  title?: string
  isStep?: boolean
  loading?: boolean
}

defineProps<Props>()

const { width } = useWindowSize()
</script>

<template>
  <CommonWrapper
    v-if="width >= 768"
    :title="title || $t('enrollment_steps')"
    class="bg-white !py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading" class="flex-y-center flex-col">
        <template v-if="loading">
          <ScholarshipCardStepLoading
            v-for="i in 5"
            :key="i"
            :reverse="isStep ? i % 2 === 1 : i % 2 === 0"
          />
        </template>
        <template v-else-if="steps.length">
          <hr class="hidden md:block w-px bg-green" />
          <ScholarshipCardStep
            v-for="(step, i) in steps"
            :key="i"
            :reverse="isStep ? i % 2 === 1 : i % 2 === 0"
            is-center
            v-bind="{ step: i + 1, data: step }"
            class="hidden md:grid"
          />
        </template>
      </div>
    </Transition>
  </CommonWrapper>

  <CommonWrapper
    v-else
    :title="title || $t('enrollment_steps')"
    class="bg-white !py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading" class="flex-y-center flex-col">
        <template v-if="loading">
          <ScholarshipCardStepLoading
            v-for="i in 5"
            :key="i"
            is-half
            reverse
          />
        </template>
        <template v-else-if="steps.length">
          <div v-if="steps?.length" class="flex-y-center flex-col">
            <ScholarshipSectionMobileSteps
              v-for="(step, i) in steps"
              :key="i"
              :reverse="isStep ? i % 2 === 1 : i % 2 === 0"
              is-center
              v-bind="{ step: i + 1, data: step }"
            />
          </div>
        </template>
      </div>
    </Transition>
  </CommonWrapper>
</template>
