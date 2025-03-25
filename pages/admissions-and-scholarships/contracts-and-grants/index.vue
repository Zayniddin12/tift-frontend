<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />

    <AdmissionsSectionWrapper
      :title="$t('contracts_and_grands')"
      active-route="contracts-and-grants"
      body-class="!py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <div class="grid sm:grid-cols-2 gap-6">
        <ScholarshipCardRequirementEntry
          :title="t('contract_prices')"
          :subtitle="t('about_contract_prices')"
          link="/admissions-and-scholarships/contracts-and-grants/contract-prices"
        />
        <ScholarshipCardRequirementEntry
          :title="t('grants_scholarships')"
          :subtitle="t('about_grants')"
          link="/admissions-and-scholarships/contracts-and-grants/grants-scholarships"
          image="/images/scholarship.png"
        />
      </div>
    </AdmissionsSectionWrapper>
  </section>
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
    path: '/admissions-and-scholarships/admission-proccess/',
    name: t('admissions_and_scholarships'),
  },
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('contracts_and_grands'),
  },
])

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
