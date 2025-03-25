<script setup lang="ts">
interface Props {
  loading: boolean
  list: any[]
  paginationData: any
  pageChange: any
  limit: number
  currentPage: number
}

defineProps<Props>()
</script>

<template>
  <section>
    <h1
      class="mb-11 text-xl md:text-2.5xl leading-130 font-bold text-dark line-clamp-2"
    >
      {{ $t('employees_of_department') }}
    </h1>

    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div
          v-if="!loading"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12"
        >
          <AboutCardEmployee
            v-for="(card, idx) in list"
            :key="idx"
            v-bind="{ card }"
          />
        </div>
        <div
          v-if="loading"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <BaseSkeleton
            v-for="i in 16"
            :key="i"
            width="100%"
            height="166px"
            v-bind="{ loading }"
          />
        </div>
        <CommonNoData v-if="!loading && !list?.length" class="mt-14" />
      </div>
    </Transition>

    <BasePagination
      v-bind="{ currentPage }"
      pagination-buttons
      :total="paginationData.count"
      :limit="limit"
      class="flex justify-end mt-8"
      @input="pageChange"
    />
  </section>
</template>

<style scoped></style>
