<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'

defineProps<{ description: string; fee: number }>()

const { t } = useI18n()

const data = ref()
const loading = ref(true)
useApi()
  .$get(`education/AdmissionProcessList/`)
  .then((res) => (data.value = res))
  .catch(() => showError({ statusCode: 404 }))
  .finally(() => (loading.value = false))
</script>

<template>
  <section>
    <EducationWrapperAbout :title="t('study_admission_title')">
      <template #body>
        <div
          v-if="description"
          class="text-sm leading-140 text-gray-1 font-normal"
          v-html="description"
        />
        <CommonNoData v-else class="py-3 md:py-0" />
      </template>
    </EducationWrapperAbout>
    <EducationCardTuitationFee :fee="fee" />
    <ScholarshipSectionSteps
      v-if="data?.results?.length || loading"
      :steps="data?.results"
      step
      :title="t('bachelor_enrolment_title')"
      :loading="loading"
    />

    <CommonNoData v-else />
  </section>
</template>
