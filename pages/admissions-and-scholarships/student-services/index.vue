<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />

    <AdmissionsSectionWrapper
      :title="$t('student_services')"
      active-route="student-services"
      body-class="!py-7"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <AdmissionsMainContent v-bind="{ data: staticPage, loading: loading }" />
    </AdmissionsSectionWrapper>

    <div class="container">
      <div class="py-8">
        <h3 class="text-2xl md:text-[28px] font-bold mb-3 md:mb-6">
          {{ $t('our_student_services') }}
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          <AdmissionsCardService
            v-for="(service, i) in serviceList"
            :key="i"
            :title="service?.title"
            :link="`student-services/${service?.id}`"
            :icon="service?.icon"
            :description="service?.subtitle"
            content-position="left"
            bg-class="bg-white"
          />
        </div>
      </div>

      <!--      Links-->
      <div class="pb-16">
        <h3 class="text-2xl md:text-[28px] font-bold mb-3 md:mb-6">
          {{ $t('links') }}
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          <StudentCardLinks
            v-for="(link, i) in linkList"
            :key="i"
            :icon="link?.icon"
            :title="link?.title"
            :link="link?.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import { useAdmissionStore } from '~/store/admissions'

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const homeStore = useHomeStore()

const loading = computed(() => homeStore.staticLoading)
const staticPage = ref({})

const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)
const serviceList = computed(() => admissionStore.serviceList)
const linkList = computed(() => admissionStore.linkList)

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/admission-proccess/',
    name: t('admissions_and_scholarships'),
  },
  {
    path: '/admissions-and-scholarships/student-services',
    name: t('student_services'),
  },
])

Promise.allSettled([
  homeStore.fetchStaticData('student-services/'),
  admissionStore.fetchServiceList(),
  admissionStore.fetchLinkList(),
]).then((res: any) => (staticPage.value = res[0]?.value))

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
