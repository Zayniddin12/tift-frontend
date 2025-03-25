<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionVacancies
      v-bind="{ menu: menuList, vacancies, total, loading, slug: menu?.slug }"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)
const vacancies = computed(() => aboutStore.vacancyList)
const total = computed(() => aboutStore.vacancyTotal)
const loading = computed(() => aboutStore.vacancyLoading)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/vacancies',
    name: t('vacancies'),
  },
])

const params = reactive({
  limit: 3,
  offset: 0,
})

function loadMore(offset: number) {
  params.offset += offset
  aboutStore.fetchVacancies(params)
}

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

if (!vacancies.value.length) {
  Promise.allSettled([aboutStore.fetchVacancies(params)])
}
</script>

<style scoped></style>
