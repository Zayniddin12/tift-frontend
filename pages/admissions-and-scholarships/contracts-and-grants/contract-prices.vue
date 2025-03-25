<template>
  <div class="pb-20">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AdmissionsSectionWrapper
      :title="$t('contract_prices')"
      active-route="contracts-and-grants"
      body-class="pt-8"
      v-bind="{ menu: menuList, slug: menu?.slug }"
    >
      <p class="text-sm text-gray-1">
        {{ t('about_contract_prices') }}
      </p>
      <Transition name="fade-sm" mode="out-in">
        <div :key="eduTypeLoading" class="mt-6">
          <div v-if="eduTypeLoading">
            <BaseSkeleton
              width="100%"
              height="300px"
              v-bind="{ loading: eduTypeLoading }"
            />
          </div>
          <div v-else>
            <BaseTab
              v-bind="{ list: educationTabs }"
              v-model="tab"
              class="mt-8"
              default-tab="bachelor-degree"
              @change="changeTab"
            />
            <Transition name="fade-sm" mode="out-in">
              <div :key="loading" class="mt-6">
                <div
                  v-if="directionList?.length"
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  <ContractPrices
                    v-for="(item, index) in directionList"
                    :key="index"
                    v-bind="{
                      image: item.cover_image,
                      degree: item?.education_type?.title,
                      title: item.title,
                      slug: item.slug,
                      price: item.tuition_fee,
                    }"
                  />
                </div>
                <CommonNoData v-else class="mt-44" />
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </AdmissionsSectionWrapper>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAdmissionStore } from '~/store/admissions'

const { t } = useI18n()
const admissionStore = useAdmissionStore()

const menu = computed(() => admissionStore.admissionMenus)
const menuList = computed(() => admissionStore.admissionMenus?.children)
const educationTabs = computed(() => admissionStore.educationTypeLists)
const loading = computed(() => admissionStore.directionListLoading)
const directionList = computed(() => admissionStore.directionList)
const eduTypeLoading = computed(() => admissionStore.eduTypeLoading)

const tab = ref('bachelor-degree')

watch(
  () => tab.value,
  (e) => {
    admissionStore.fetchDirectionList(e)
  }
)

function changeTab(e: string) {
  tab.value = e
}

const breadcrumbRoutes = computed(() => [
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('contracts_and_grands'),
  },
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: t('contract_prices'),
  },
])

Promise.allSettled([
  admissionStore.fetchEducationTypeLists(),
  admissionStore.fetchDirectionList(tab.value),
])

if (!menuList.value?.length) {
  Promise.allSettled([admissionStore.fetchSiteMenuDetail()])
}
</script>
