<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { INews } from '~/types/news'

const { t } = useI18n()
const breadcrumbRoutes = computed(() => [
  {
    path: '/news-and-events',
    name: t('news_and_events'),
  },
  {
    path: '/news',
    name: t('all_news'),
  },
])

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher<INews>('press-service/NewsList/', 9)
</script>

<template>
  <div class="pb-16">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="container pt-8">
      <div
        class="flex-center-between mb-8 max-md:flex-col gap-4 max-md:items-start"
      >
        <CommonSectionTitle :title="$t('all_news')" />
        <FormInputSearch
          class="max-md:max-w-full"
          :default-value="params.search"
          @search="params.search = $event"
        />
      </div>
      <Transition name="fade" mode="out-in">
        <div
          v-if="list?.length || loading.list"
          :key="loading.list"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5"
        >
          <NewsCard
            v-for="(item, index) in loading.list ? 9 : list"
            :key="index"
            v-bind="{ item, loading: loading.list }"
          />
        </div>
        <CommonNoData v-else class="mt-20"> </CommonNoData>
      </Transition>
      <BasePagination
        class="mt-8 flex justify-end"
        v-bind="{ currentPage }"
        pagination-buttons
        :total="paginationData.count"
        :limit="params.limit"
        @input="pageChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
