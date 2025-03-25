<template>
  <div class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      :title="t('registration')"
      active-route="admission-proccess"
      body-class="md:!pb-0 sm:!pt-14 sm:!pb-16 sm:!py-0"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <AdmissionsMainContent v-bind="{ data: staticPage, loading: loading }" />
    </AdmissionsSectionWrapper>

    <div class="w-full bg-white">
      <ScholarshipSectionSteps v-bind="{ steps: enrollmentSteps }" />
    </div>
    <div class="container !py-7 sm:py-[44px]">
      <h3
        v-if="enrollmentRequirements?.length"
        class="text-xl sm:text-[28px] font-bold mb-8 sm:mb-16"
      >
        {{ $t('enrollment_requirements') }}
      </h3>
      <AdmissionsEnrollmentRequirements
        :requirements="enrollmentRequirements"
      />
    </div>

    <div class="bg-white w-full pb-8 sm:pb-16 pt-7 sm:pt-11">
      <div class="container">
        <h3
          v-if="contacts?.length"
          class="text-xl sm:text-[28px] font-bold mb-5 md:mb-6"
        >
          {{ $t('contact_us') }}
        </h3>
        <transition name="fade" mode="out-in">
          <div :key="contactLoading">
            <div class="grid sm:grid-cols-2 gap-6">
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
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import { useAdmissionStore } from '~/store/admissions'
import { useContactStore } from '~/store/contact'

const homeStore = useHomeStore()
const loading = computed(() => homeStore.staticLoading)
const staticPage = ref({})

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const contactStore = useContactStore()

const contactLoading = computed(() => contactStore.contactLoading)
const contacts = computed(() => contactStore.contactList?.slice(0, 2))
const enrollmentSteps = computed(() => admissionStore.enrollmentSteps)
const enrollmentRequirements = computed(
  () => admissionStore.enrollmentRequirements
)
const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/admission-proccess',
    name: t('registration'),
  },
])

Promise.allSettled([homeStore.fetchStaticData('register-page/')]).then(
  (res: any) => (staticPage.value = res[0]?.value)
)

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}

if (!enrollmentSteps.value?.length) {
  Promise.allSettled([admissionStore.fetchEnrollmentSteps()])
}

Promise.allSettled([
  admissionStore.fetchEnrollmentRequirements('common'),
  contactStore.fetchContactList(),
])
</script>
