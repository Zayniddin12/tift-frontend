<template>
  <div class="overflow-x-hidden">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSingle
      back-link="/news"
      :no-back="false"
      v-bind="{ data }"
      :show-single-info="true"
      :single-type="data?.category?.title"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'

const { t } = useI18n()
const route = useRoute()

const breadcrumbRoutes = computed(() => [
  {
    path: '/news-and-events',
    name: t('news_and_events'),
  },
  {
    path: '/news',
    name: t('news'),
  },
  {
    path: `/news/${route.params.slug}`,
    name: data.value?.title,
  },
])

const { data, error } = useAsyncData(() =>
  useApi().$get(`/press-service/NewsDetail/${route.params.slug}/`)
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
  ogImage: data.value?.background_image ?? data.value?.cover_image,
  twitterImage: data.value?.background_image ?? data.value?.cover_image,
})
</script>
