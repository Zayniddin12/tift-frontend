<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { IEvents } from '~/types/events'

const { updateQuery } = useQueryChange()
const { t } = useI18n()
const route = useRoute()

const date = ref(route.query.event_date)

const breadcrumbRoutes = computed(() => [
  {
    path: '/news-and-events',
    name: t('news_and_events'),
  },
  {
    path: '/events',
    name: t('all_events'),
  },
])
const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher<IEvents>('press-service/EventList/', 12, {
    event_date: date.value,
  })

watch(
  () => date.value,
  (newValue) => {
    loading.list = true
    params.event_date = dayjs(newValue).format('YYYY-MM-DD')
    updateQuery('event_date', newValue)
  }
)
</script>

<template>
  <div class="pb-16">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="container pt-8">
      <div
        class="flex-center-between mb-4 md:mb-8 gap-6 max-md:flex-col max-md:gap-4 max-md:items-start"
      >
        <CommonSectionTitle class="shrink-0" :title="$t('all_events')" />
        <div
          class="flex-y-center max-md:items-start max-md:flex-col gap-3 md:gap-5 w-full justify-end"
        >
          <FormDatePicker
            v-model="date"
            input-class="!bg-white focus-within:!border-green"
            class="w-full md:max-w-[200px]"
          />
          <FormInputSearch
            :default-value="params.search"
            class="max-md:max-w-full"
            @search="params.search = $event"
          />
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="loading.list || list?.length"
          :key="loading.list"
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5"
        >
          <EventCard
            v-for="(item, index) in loading.list ? 9 : list"
            :key="index"
            v-bind="{ item, loading: loading.list }"
          />
        </div>
        <CommonNoData v-else class="mt-20"> </CommonNoData>
      </transition>

      <div class="mt-8 flex justify-end">
        <BasePagination
          v-bind="{ currentPage }"
          :total="paginationData.count"
          :limit="params.limit"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </div>
  </div>
</template>
