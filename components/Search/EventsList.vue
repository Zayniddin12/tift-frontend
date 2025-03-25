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
      <SearchCard v-if="list?.length" :title="t('events')" link="events" no-btn>
        <SearchCardEvents
          v-for="(event, i) in list"
          :key="i"
          v-bind="{ item: event, loading: loading.list }"
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
import type { IEvents } from '~/types/events'

const { t } = useI18n()
const route = useRoute()

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher<IEvents>('press-service/EventList/', 4, {
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
