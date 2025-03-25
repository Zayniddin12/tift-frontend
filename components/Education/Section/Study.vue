<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ description: string }>()

const { t } = useI18n()
</script>

<template>
  <section class="mb-10">
    <EducationWrapperAbout :title="t('study_about_title')">
      <template #body>
        <div
          v-if="description"
          class="text-sm leading-140 text-gray-1 font-normal"
          v-html="description"
        />

        <CommonNoData v-else class="py-3 md:py-0" />
      </template>
    </EducationWrapperAbout>
    <EducationSectionSubjectsTable />
  </section>
</template>

<style scoped></style>
