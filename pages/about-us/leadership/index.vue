<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionLeadership
      class="pb-8"
      v-bind="{ menu: menuList, slug: menu?.slug }"
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

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/leadership',
    name: t('leadership'),
  },
])

if (!menuList.value?.length) {
  aboutStore.fetchSiteMenuDetail()
}
</script>

<style scoped></style>
