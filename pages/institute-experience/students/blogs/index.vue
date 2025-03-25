<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { list, loading, pageChange, paginationData, params, currentPage } =
  useListFetcher('/institute-experience/StudentBlogsList/')

const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/students',
    name: t('students'),
  },
  {
    path: '/institute-experience/students/blogs',
    name: t('student_blogs'),
  },
])
</script>

<template>
  <div class="pb-16">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="container pt-11">
      <CommonSectionTitle class="mb-8" :title="$t('student_blogs')" />
      <div
        v-if="loading.list && list?.length"
        class="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <StudentCardBlog
          v-for="(card, index) in loading.list ? 9 : list"
          :key="index"
          v-bind="{ card, loading: loading.list }"
        />
      </div>
      <div v-else>
        <CommonNoData />
      </div>

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
