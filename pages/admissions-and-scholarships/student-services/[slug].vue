<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      body-class="!pt-8"
      :title="data?.title"
      active-route="student-services"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <div
            v-if="data?.body && !loading"
            class="text-sm text-gray-1"
            v-html="data?.body"
          />
          <BaseSkeleton width="100%" height="444px" v-bind="{ loading }" />
        </div>
      </Transition>
    </AdmissionsSectionWrapper>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useAdmissionStore } from '~/store/admissions'
import {useAsyncData} from "#app";

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const route = useRoute()

const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)

const loading = ref(false)


const { data, error } = useAsyncData(() =>
    useApi().$get(`admissions/StudentServiceDetail/${route.params.slug}`)
)


const breadcrumbRoutes = reactive([
  {
    path: '/admissions-and-scholarships/student-services',
    name: t('student_services'),
  },
  {
    path: '/admissions-and-scholarships/student-services',
    name: '',
  },
])



watch(
  () => data.value,
  (e) => {
    breadcrumbRoutes[1].name = e?.title
  }
)

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}

useSeoMeta({
  title: data.value?.title,
  twitterTitle: data.value?.title,
  ogTitle: data.value?.title,
})
</script>
