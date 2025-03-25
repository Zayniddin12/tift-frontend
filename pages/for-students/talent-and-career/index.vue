<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <StudentSectionWrapper
      :title="t('talent_and_career')"
      active-route="talent-and-career"
      v-bind="{ menu }"
    >
      <transition name="fade" mode="out-in">
        <div
          :key="loading.list"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <StudentCardTalent
            v-for="(data, idx) in loading.list ? 9 : list"
            :key="idx"
            v-bind="{ data, loading: loading.list }"
          />
        </div>
      </transition>
      <div class="flex items-center justify-end w-full my-6">
        <BasePagination
          v-bind="{ currentPage }"
          :total="paginationData.count"
          :limit="params.limit"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </StudentSectionWrapper>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useListFetcher } from '~/composables/useListFetcher'
import { useStudentsStore } from '~/store/students'
import type { IStudentStory } from '~/types/student'

const { t } = useI18n()
const studentStore = useStudentsStore()
const menu = computed(() => studentStore.menu)

const breadcrumbRoutes = computed(() => [
  {
    path: '/for-students/talent-and-career',
    name: t('talent_and_career'),
  },
])

const { list, loading, currentPage, params, pageChange, paginationData } =
  useListFetcher<IStudentStory>('institute-experience/StudentStoryList/')

Promise.allSettled([studentStore.fetchMenu()])
</script>

<style scoped></style>
