<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionNews
      v-bind="{
        menu: menuList,
        slug: menu?.slug,
        loading: loading.list,
        pageChange,
        list,
        paginationData,
        params,
        currentPage,
        cooperation,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)
const cooperation = computed(() => aboutStore.cooperation)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/international-cooperation',
    name: t('international_cooperation'),
  },
])

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher('press-service/NewsList/?cooperation=true', 9)

if (!cooperation.value?.length) {
  Promise.allSettled([aboutStore.fetchCooperation()])
}
</script>

<style scoped></style>
