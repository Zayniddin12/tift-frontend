<template>
  <div class="grid sm:grid-cols-2 gap-x-6 gap-y-8">
    <ScholarshipCardRequirement
      v-for="(item, index) in requirements"
      :key="index"
      :text="item?.body"
      :idx="index < 9 ? `0${index + 1}` : index + 1"
    />
  </div>
</template>
<script setup lang="ts">
import type { IEnrollmentSteps } from '~/types/admissions'

interface Props {
  requirements?: IEnrollmentSteps[]
}

defineProps<Props>()
</script>
