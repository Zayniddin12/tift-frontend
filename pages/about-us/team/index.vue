<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher('common/EmployeeList/', 15)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/team',
    name: t('our_team'),
  },
])
</script>

<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper :title="t('our_team')">
      <template #default>
        <section class="pb-[89px]">
          <Transition name="fade" mode="out-in">
            <div
              :key="loading.list"
              class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8"
            >
              <TeamCardProfile
                v-for="(card, idx) in loading.list ? 15 : list"
                :key="idx"
                v-bind="{ ...card, loading: loading.list }"
              />
            </div>
          </Transition>
          <BasePagination
            v-bind="{ currentPage }"
            pagination-buttons
            :total="paginationData.count"
            :limit="params.limit"
            @input="pageChange"
          />
        </section>
      </template>
    </CommonSectionWrapper>
    <MainSectionCollapse class="mb-0 !pt-14" />
  </div>
</template>

<style scoped></style>
