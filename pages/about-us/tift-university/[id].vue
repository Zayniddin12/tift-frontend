<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebounceFn, useWindowSize } from '@vueuse/core'

import { useAboutStore } from '~/store/about'
import type { IDepartment } from '~/types/about'

const { t } = useI18n()
const route = useRoute()
const aboutStore = useAboutStore()
const menu = computed(() => aboutStore.aboutMenuList)
const singleDetail = ref<IDepartment>()

const { width } = useWindowSize()

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/tift-university',
    name: t('tift_university'),
  },
  {
    path: `/about-us/tift-university/${singleDetail.value?.slug}`,
    name: singleDetail.value?.title,
  },
])

if (!menu.value.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}

const { loading, pageChange, list, paginationData, params, currentPage, resetList } = useListFetcher(`common/EmployeeList/?department__slug=${route.params?.id}`, 20)

const debouncedFn = useDebounceFn((newVal) => {
  if (newVal <= 768) {
    resetList(20)
  }

  if (newVal <= 575) {
    resetList(9)
  }

}, 1000)

watch(() => width.value, (newVal) => debouncedFn(newVal))

Promise.allSettled([
  aboutStore.fetchDepartmentDetail(String(route.params.id)),
]).then((res: any) => {
  singleDetail.value = res[0].value
})

useSeoMeta({
  title: singleDetail.value?.title,
  description: singleDetail.value?.subtitle,
  twitterTitle: singleDetail.value?.title,
  twitterDescription: singleDetail.value?.subtitle,
  ogTitle: singleDetail.value?.title,
  ogDescription: singleDetail.value?.subtitle,
  ogImage: singleDetail.value?.background_image,
  twitterImage: singleDetail.value?.background_image,
})
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
      :active-route="'tift-university'"
      :title="singleDetail?.title"
      v-bind="{ menu }"
    >
      <template #default>
        <Transition name="fade" mode="out-in">
          <div :key="loading.list">
            <BaseSkeleton
              width="100%"
              height="250px"
              v-bind="{ loading: loading.list }"
            />
            <AboutCardUser
              v-if="!loading.list"
              :user="singleDetail?.leader"
              class="md:ml-5 md:mt-6 mb-6 bg-white md:bg-transparent -mt-12"
            />
            <BaseSkeleton
              width="100%"
              height="350px"
              v-bind="{ loading: loading.list }"
              preloader-class="my-8"
            />
            <div
              v-if="singleDetail?.description"
              class="bg-white mb-8 p-6 text-sm leading-140 text-gray-1"
              v-html="singleDetail?.description"
            />
          </div>
        </Transition>
        <AboutSectionEmployees
          v-bind="{
            loading: loading.list,
            list,
            paginationData,
            pageChange,
            limit: params.limit,
            currentPage,
          }"
        />
      </template>
    </AboutSectionWrapper>
  </section>
</template>

<style scoped></style>
