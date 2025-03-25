<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useNewsAndEventsStore } from '~/store/news-and-events'

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/news-and-events',
    name: t('news_and_events'),
  },
])
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <NewsAndEvents
      class="!bg-transparent"
      news-wrapper-class="!pt-8 !pb-14"
      events-wrapper-class="!pt-0"
      news-title="news"
      events-title="events"
    />
  </section>
</template>

<style scoped></style>
