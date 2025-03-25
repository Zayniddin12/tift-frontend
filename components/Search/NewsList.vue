<template>
  <Transition name="fade" mode="out-in">
    <div :key="loading.list">
      <div class="max-w-3xl mx-auto">
        <BaseSkeleton
          width="100%"
          height="400px"
          v-bind="{ loading: loading.list }"
        />
      </div>
      <SearchCard v-if="list?.length" :title="t('news')" link="news" no-btn>
        <SearchCardNews
          v-for="(news, i) in list"
          :key="i"
          v-bind="{ item: news, loading: loading.list }"
        />
      </SearchCard>

      <CommonNoData v-if="!loading.list && !list?.length" class="my-14" />

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
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { INews } from '~/types/news'

const { t } = useI18n()
const route = useRoute()

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher<INews>('press-service/NewsList/', 4, {
    search: route.query.q,
  })

watch(
  () => route.query.q,
  (newValue) => {
    loading.list = true
    params.search = newValue
  }
)
</script>
