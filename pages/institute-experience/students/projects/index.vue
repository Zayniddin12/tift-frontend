<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { list, loading, pageChange, paginationData, params, currentPage } =
  useListFetcher('/institute-experience/StudentProjectsList/', 5)

const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/students',
    name: t('students'),
  },
  {
    path: '/institute-experience/students/projects',
    name: t('student_projects'),
  },
])
</script>

<template>
  <div class="pb-16">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="container pt-11 flex items-start gap-6">
      <div class="w-full">
        <CommonSectionTitle class="mb-8" :title="$t('student_projects')" />
        <Transition name="fade" mode="out-in">
          <div :key="loading.list" class="flex flex-col gap-6">
            <StudentCardProject
              v-for="(card, index) in loading.list ? 5 : list"
              :key="index"
              v-bind="{ card, loading: loading.list }"
              class="lg:even:flex-row-reverse"
            />
          </div>
        </Transition>
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
      <div class="w-1/4 max-lg:hidden">
        <CommonAds />
        <AboutCardContact class="mt-6" />
      </div>
    </div>
  </div>
</template>
