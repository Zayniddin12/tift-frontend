<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <StudentSectionWrapper
      :title="t('talent_and_career')"
      active-route="talent-and-career"
      v-bind="{ menu }"
    >
      <StudentCardSingle :user="data" class="mb-4 md:mb-8" />
      <div class="bg-white p-3 md:p-6">
        <div class="static-text" v-html="data?.description"></div>
        <CommonSingleActions
          class="mt-4 md:mt-8"
          :title="data?.student?.full_name"
          :views="data?.views_count"
        />
      </div>
    </StudentSectionWrapper>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useStudentsStore } from '~/store/students'

const { t } = useI18n()
const studentStore = useStudentsStore()
const menu = computed(() => studentStore.menu)
const route = useRoute()

const breadcrumbRoutes = computed(() => [
  {
    path: '/for-students/talent-and-career',
    name: t('talent_and_career'),
  },
  {
    path: `/talent-and-career/${route.params.slug}`,
    name: data.value?.student?.full_name,
  },
])

const { data, error } = await useAsyncData(() =>
  useApi().$get(
    `/institute-experience/StudentStoryDetail/${route.params.slug}/`
  )
)
if (error.value) {
  showError({ statusCode: 404 })
}

useSeoMeta({
  title: data.value?.student?.full_name,
  description: richTextPurify(data.value?.description),
  twitterTitle: data.value?.student?.full_name,
  twitterDescription: richTextPurify(data.value?.description),
  ogTitle: data.value?.student?.full_name,
  ogDescription: richTextPurify(data.value?.description),
})
</script>

<style scoped></style>
