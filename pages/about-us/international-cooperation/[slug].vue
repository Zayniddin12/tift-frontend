<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSingle :data="singleData" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useAboutStore } from '~/store/about'
import type { ICooperationSingle } from '~/types/about'

const { t } = useI18n()

const aboutStore = useAboutStore()
const singleData = ref<ICooperationSingle>({})
const route = useRoute()

const breadcrumbRoutes = reactive([
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/international-cooperation',
    name: t('international_cooperation'),
  },
  {
    path: `/about-us/international-cooperation/`,
    name: '',
  },
])

watch(
  () => singleData.value,
  (val) => {
    if (val) {
      breadcrumbRoutes[2].name = val?.title
    }
  }
)

Promise.allSettled([
  aboutStore.fetchSingleCooperation(+route.params?.slug),
]).then((res: any) => (singleData.value = res[0].value))

useSeoMeta({
  title: singleData.value?.title,
  description: singleData.value?.subtitle,
  twitterTitle: singleData.value?.title,
  twitterDescription: singleData.value?.subtitle,
  ogTitle: singleData.value?.title,
  ogDescription: singleData.value?.subtitle,
  ogImage: singleData.value?.background_image,
  twitterImage: singleData.value?.background_image,
})
</script>
<style scoped></style>
