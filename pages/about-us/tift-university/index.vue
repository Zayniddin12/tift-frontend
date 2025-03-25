<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NoData from '~/components/Common/NoData.vue'
import { useListFetcher } from '~/composables/useListFetcher'
import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/tift-university',
    name: t('tift_university'),
  },
])

const { loading, pageChange, list, paginationData, params, currentPage } = useListFetcher('common/DepartmentList/', 15)

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>

<template>
  <div class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
      :title="t('tift_university')"
      :active-route="'tift-university'"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <template #default>
        <Transition name="fade" mode="out-in">
          <div :key="loading.list">
            <section
              v-if="!loading.list && list?.length"
              class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            >
              <AboutCardCategory
                v-for="(card, idx) in list"
                :key="idx"
                v-bind="{ ...card }"
                :link="`/about-us/tift-university/${card?.slug}`"
              />
            </section>

            <section v-if="loading.list" class="grid grid-cols-3 gap-6">
              <BaseSkeleton
                v-for="i in 9"
                :key="i"
                width="100%"
                height="100px"
                v-bind="{ loading: loading.list }"
              />
            </section>
            <no-data v-if="!loading.list && !list?.length" class="mt-14" />
          </div>
        </Transition>
        <BasePagination
          class="mt-8 flex justify-end"
          v-bind="{ currentPage }"
          pagination-buttons
          :total="paginationData.count"
          :limit="params.limit"
          @input="pageChange"
        />
      </template>
    </AboutSectionWrapper>
  </div>
</template>

<style scoped></style>
