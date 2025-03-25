<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSingle v-bind="{ data }">
      <template #beforeContent>
        <div class="px-4 py-3 bg-gray-4 mt-6 flex-y-center gap-3">
          <i class="icon-avatar text-2.5xl leading-7 text-gray-1" />
          <div>
            <p class="text-gray-1">{{ $t('author') }}</p>
            <h5
              class="flex-y-center gap-1 text-sm text-dark font-bold leading-6"
            >
              {{ data?.student || 'Full name' }}
            </h5>
          </div>
        </div>
      </template>
    </CommonSingle>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/students',
    name: t('students'),
  },
  {
    path: '/institute-experience/students/projects',
    name: t('student_projects'),
  },
  {
    path: `/institute-experience/students/projects/${route.params.slug}`,
    name: data.value?.title,
  },
])

const { data, error } = useAsyncData(() =>
  useApi().$get(
    `/institute-experience/StudentBlogsDetail/${route.params.slug}/`
  )
)

if (error.value) {
  showError({ statusCode: 404 })
}

useSeoMeta({
  title: data.value?.title,
  description: data.value?.subtitle,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.subtitle,
  ogTitle: data.value?.title,
  ogDescription: data.value?.subtitle,
  ogImage: data.value?.background_image,
  twitterImage: data.value?.background_image,
})
</script>
<style scoped></style>
