<template>
  <BaseBreadcrumb :routes="breadcrumbRoutes" />
  <ExperienceSectionWrapper
    :title="t('faculty')"
    active-route="faculties"
    v-bind="{ menu }"
    show-ads
    show-back-btn
  >
    <div class="my-6 pl-5">
      <AboutCardUser :user="data" />
    </div>
    <div v-if="data?.description" class="bg-white p-6 relative z-10 space-y-6">
      <div
        class="text-sm font-normal leading-tight text-gray-1"
        v-html="data?.description"
      />
    </div>
  </ExperienceSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useInstituteStore } from '~/store/institute-experience'

const institutionStore = useInstituteStore()
const menu = computed(() => institutionStore.menu)

const route = useRoute()

const { data } = useAsyncData('fetchMenu', () =>
  useApi().$get(`/common/EmployeeDetail/${route.params.slug}`)
)

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/faculties',
    name: t('faculty'),
  },
  {
    path: '/institute-experience/faculties/',
    name: t('faculty_scientific_works'),
  },
])

institutionStore.fetchMenu()

useSeoMeta({
  title: data.value?.full_name,
  description: richTextPurify(data.value?.description),
  twitterTitle: data.value?.full_name,
  twitterDescription: richTextPurify(data.value?.description),
  ogTitle: data.value?.full_name,
  ogDescription: richTextPurify(data.value?.description),
})
</script>

<style scoped></style>
