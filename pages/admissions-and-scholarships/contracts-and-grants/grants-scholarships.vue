<template>
  <div class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      :title="$t('grants_scholarships')"
      active-route="contracts-and-grants"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <AdmissionsMainContent v-bind="{ data: staticPage, loading: loading }" />
    </AdmissionsSectionWrapper>
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

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('admissions_and_scholarships'),
  },
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('contracts_and_grands'),
  },
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('grants_scholarships'),
  },
])

Promise.allSettled([homeStore.fetchStaticData('grant-scholarship/')]).then(
  (res: any) => (staticPage.value = res[0]?.value)
)

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
