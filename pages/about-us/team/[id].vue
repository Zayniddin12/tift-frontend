<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store'

const { t } = useI18n()

const homeStore = useHomeStore()
const loading = ref(true)

const route = useRoute()
const singleDetail = ref({})

if (!homeStore.employeeList) {
  homeStore.fetchEmployeeList({})
}

Promise.allSettled([homeStore.fetchSingleEmployee(+route.params.id)])
  .then((res: any) => {
    singleDetail.value = res[0].value
  })
  .finally(() => (loading.value = false))

const breadcrumbRoutes = reactive([
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/team',
    name: t('our_team'),
  },
  {
    path: '/about-us/team',
    name: '',
  },
])

useSeoMeta({
  title: singleDetail.value?.full_name,
  description:
    singleDetail.value?.short_description ?? singleDetail.value?.description,
  twitterTitle: singleDetail.value?.full_name,
  twitterDescription:
    singleDetail.value?.short_description ?? singleDetail.value?.description,
  ogTitle: singleDetail.value?.full_name,
  ogDescription:
    singleDetail.value?.description ?? singleDetail.value?.short_description,
  ogImage: singleDetail.value?.phone,
  twitterImage: singleDetail.value?.photo,
})

watch(
  () => singleDetail.value,
  (val) => {
    breadcrumbRoutes[2].name = val?.full_name
  }
)
</script>

<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper :title="t('our_team')" has-side-bar>
      <template #default>
        <Transition name="fade" mode="out-in">
          <main :key="loading">
            <BaseSkeleton width="100%" height="300px" v-bind="{ loading }" />
            <div v-if="!loading">
              <section
                class="flex flex-col lg:flex-row lg:items-center bg-white space-y-6 lg:space-y-0 lg:space-x-6 lg:min-h-[300px] mb-2 md:mb-8"
              >
                <div
                  class="lg:max-h-full w-full md:max-w-[278px] lg:min-w-[278px]"
                >
                  <img
                    v-if="singleDetail?.photo"
                    v-lazy="singleDetail?.photo"
                    :alt="singleDetail?.full_name"
                    class="lg:max-w-full lg:max-h-full w-full object-cover aspect-square md:aspect-[278/300]"
                  />
                </div>

                <div class="px-4 pb-4 md:pl-0 md:pb-0 md:pr-6">
                  <h1
                    class="mb-1 text-xl md:text-2xl text-dark leading-130 font-bold uppercase"
                  >
                    {{ singleDetail?.full_name }}
                  </h1>
                  <hr
                    class="inline-block w-[125px] h-1 mb-1 md:mb-4 bg-green"
                  />
                  <p
                    v-if="singleDetail?.position"
                    class="mb-6 text-sm md:text-base font-medium leading-130 text-green line-clamp-3"
                  >
                    {{ singleDetail?.position }}
                  </p>
                  <div
                    class="text-sm text-gray-1 leading-140"
                    v-html="singleDetail?.short_description"
                  />
                </div>
              </section>
              <section v-if="singleDetail?.description" class="p-5 bg-white">
                <div
                  class="mb-6 text-sm leading-140 font-normal text-gray-1 static-text"
                  v-html="singleDetail?.description"
                />
              </section>
            </div>
          </main>
        </Transition>
      </template>
    </AboutSectionWrapper>

    <CommonSectionWrapper :title="t('others')" class="!pt-0 mt-11 mb-[87px]">
      <template #after>
        <TeamCardProfileSwiper v-bind="{ loading }" />
      </template>
    </CommonSectionWrapper>
  </div>
</template>

<style>
.static-text ul {
  margin-top: 12px;
}
</style>
