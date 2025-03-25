<template>
  <div class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />

    <AdmissionsSectionWrapper
      :title="$t('requirements')"
      active-route="entry-requirements"
      body-class="!py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <div class="grid sm:grid-cols-2 gap-6">
        <ScholarshipCardRequirementEntry
          :title="t('first_year')"
          :subtitle="t('about_first_year')"
          image="/images/first-year.png"
          link="/admissions-and-scholarships/entry-requirements/first-year-students"
        />

        <ScholarshipCardRequirementEntry
          :title="t('transfer_study')"
          :subtitle="t('about_transfer_study')"
          image="/images/transfer-study.png"
          link="/admissions-and-scholarships/entry-requirements/transfer-study"
        />
      </div>
    </AdmissionsSectionWrapper>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAdmissionStore } from '~/store/admissions'

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: t('admissions_and_scholarships'),
  },
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: t('requirements'),
  },
])

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
