<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper>
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <BaseSkeleton width="100%" height="400px" v-bind="{ loading }">
            <div class="bg-white wrapper-bg relative">
              <nuxt-link to="/about-us/vacancies">
                <span
                  class="icon-arrow absolute active:text-green top-2 left-2 sm:top-10 sm:left-10 text-3xl"
                ></span>
              </nuxt-link>
              <div class="w-full px-5 sm:px-0 sm:w-3/4 mx-auto pt-10 sm:pt-10">
                <BaseSkeleton width="100%" height="100x" v-bind="{ loading }">
                  <div class="">
                    <h1
                      class="mb-2 text-2xl md:text-[32px] font-semibold leading-130 line-clamp-2 group-hover:text-green"
                    >
                      {{ vacancyDetail?.title }}
                    </h1>
                    <hr class="h-0.5 w-[92px] bg-gray-3 mb-4" />
                    <div>
                      <div class="flex items-center space-x-1">
                        <span class="icon-map-pin text-2xl text-gray-1"></span>
                        <span
                          class="text-sm font-semibold leading-130 text-gray-1"
                          >{{ vacancyDetail?.region?.name }}</span
                        >
                      </div>
                      <ul class="flex mb-4 lg:mb-9 mt-6">
                        <li class="space-x-2 first:mr-4 flex items-center">
                          <i class="text-green text-xl md:text-3xl icon-call" />
                          <div>
                            <p
                              class="font-normal text-gray-1 text-xs leading-130"
                            >
                              {{ t('phone_number') }}
                            </p>
                            <p class="font-medium leading-130">
                              {{
                                formatPhoneNumber(vacancyDetail?.phone_number)
                              }}
                            </p>
                          </div>
                        </li>
                        <li class="space-x-2 first:mr-4 flex items-center">
                          <i
                            class="text-green text-xl md:text-3xl icon-clock"
                          />
                          <div>
                            <p
                              class="font-normal text-gray-1 text-xs leading-130"
                            >
                              {{ t('working_time') }}
                            </p>
                            <p class="font-medium leading-130">
                              {{ vacancyDetail?.work_time }}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div
                      v-if="vacancyDetail?.description"
                      class="text-sm text-gray-1 overflow-auto section-description static-text"
                      v-html="vacancyDetail?.description"
                    />
                  </div>
                </BaseSkeleton>
                <BaseSkeleton width="100%" height="100px" v-bind="{ loading }">
                  <div class="divide-y">
                    <a
                      :href="vacancyDetail?.submission_link"
                      target="_blank"
                      class="flex items-center justify-between py-10"
                    >
                      <BaseButton
                        class="w-full"
                        :icon="'icon-send'"
                        size="large"
                        :text="t('submit_resume')"
                      />
                    </a>
                    <div
                      class="flex items-center flex-wrap lg:flex-nowrap justify-between py-5 md:py-10"
                    >
                      <div
                        class="w-full flex items-center justify-between flex-col space-y-3 md:space-y-0 sm:flex-row flex-wrap lg:flex-nowrap space-x-3 lg:space-x-10"
                      >
                        <CommonButtonShare
                          :title="vacancyDetail?.title"
                          class="w-full md:w-auto"
                        />
                        <CommonButtonCopy
                          class="w-full max-w-full sm:max-w-auto md:w-auto !ml-0 md:!ml-3"
                        />
                      </div>
                      <div
                        class="w-full flex items-center justify-between md:justify-end space-x-3 sm:space-x-10 mt-3 lg:mt-0"
                      >
                        <div class="flex items-center space-x-3">
                          <span class="icon-eye text-gray-1 text-xl"></span>
                          <span>{{ vacancyDetail?.views_count }}</span>
                        </div>
                        <CommonButtonPrint class="ml-auto sm:ml-0" />
                      </div>
                    </div>
                  </div>
                </BaseSkeleton>
              </div>
            </div>
          </BaseSkeleton>
        </div>
      </Transition>
    </CommonSectionWrapper>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'

const { t } = useI18n()
const route = useRoute()

const aboutStore = useAboutStore()
const vacancyDetail = ref()

const loading = ref(true)

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/vacancies',
    name: t('vacancies'),
  },
  {
    path: `/about-us/vacancies/${route.params.slug}`,
    name: vacancyDetail.value?.title,
  },
])

Promise.allSettled([aboutStore.fetchVacancyDetail(+route.params.slug)])
  .then((res: any) => {
    loading.value = true
    vacancyDetail.value = res[0].value
  })
  .finally(() => (loading.value = false))

useSeoMeta({
  title: vacancyDetail.value?.title,
  description: vacancyDetail.value?.subtitle,
  twitterTitle: vacancyDetail.value?.title,
  twitterDescription: vacancyDetail.value?.subtitle,
  ogTitle: vacancyDetail.value?.title,
  ogDescription: vacancyDetail.value?.subtitle,
  ogImage: vacancyDetail.value?.background_image,
  twitterImage: vacancyDetail.value?.background_image,
})
</script>
<style>
.wrapper-bg {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
.section-description p strong {
  margin-bottom: 20px !important;
  padding-bottom: 20px !important;
  font-weight: 600;
  color: #07091c;
}
.section-description ul {
  margin-bottom: 20px !important;
  margin-top: 20px !important;
}
</style>
