<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      :title="t('first_year')"
      active-route="entry-requirements"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <AdmissionsMainContent v-bind="{ data: staticPage, loading: loading }" />
    </AdmissionsSectionWrapper>

    <div class="container py-[44px]">
      <h3 class="text-xl md:text-[28px] font-bold mb-8 md:mb-16">
        {{ $t('enrollment_requirements') }}
      </h3>
      <AdmissionsEnrollmentRequirements
        :requirements="enrollmentRequirements"
      />
    </div>

    <div class="bg-white w-full pb-16 pt-8 md:pt-[44px]">
      <div class="container">
        <h3 class="text-xl md:text-[28px] font-bold mb-6">
          {{ $t('contact_us') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <MainContactUsCard
            v-for="item in contacts"
            :key="item"
            :title="item.type.title"
            :sub-title="item.address"
            :phone="item.phone_number"
            is-main
            :email="item.email"
            class="!bg-gray-4"
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
import { useContactStore } from '~/store/contact'

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const contactStore = useContactStore()
const homeStore = useHomeStore()

const contacts = computed(() => contactStore.contactList?.slice(0, 2))

const loading = computed(() => homeStore.staticLoading)
const staticPage = ref({})

const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)
const enrollmentRequirements = computed(
  () => admissionStore.enrollmentRequirements
)

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: t('admissions_and_scholarships'),
  },
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: t('requirements'),
  },
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: '1st years students',
  },
])

Promise.allSettled([homeStore.fetchStaticData('first-year-student/')]).then(
  (res: any) => (staticPage.value = res[0]?.value)
)

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}

Promise.allSettled([
  admissionStore.fetchEnrollmentRequirements('first_year_students'),
  contactStore.fetchContactList(),
])
</script>
