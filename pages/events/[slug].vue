<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSingle v-bind="{ data }" show-single-info single-type="events">
      <template #afterHead>
        <EventStatus :date="data?.event_date" :status="data?.status" />
      </template>
    </CommonSingle>
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
    path: '/events',
    name: t('events'),
  },
  {
    path: `/events/${route.params.slug}`,
    name: data.value?.title ?? '',
  },
])

const { data, error } = useAsyncData(() =>
  useApi().$get(`/press-service/EventDetail/${route.params.slug}/`)
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
<style scoped></style>
