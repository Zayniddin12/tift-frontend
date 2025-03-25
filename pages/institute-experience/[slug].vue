<script setup lang="ts">
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import { useInstituteStore } from '~/store/institute-experience'
import type { IResponse } from '~/types/common/serverResponse'
import type { ICampusPicture, IComment } from '~/types/institute-experience'

const { t } = useI18n()
const institutionStore = useInstituteStore()
const route = useRoute()

const isTashkentBranch = computed(
  () => route.params?.slug === 'tashkent-branch'
)
const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/students',
    name: data.value?.title,
  },
])

const data = ref()
const campusPictures = ref<ICampusPicture[]>()
const comments = ref<IComment[]>()
const menu = computed(() => institutionStore.menu)

const getStaticPage = async () => {
  data.value = await useApi().$get(`/common/StaticPage/${route.params?.slug}`)
  return data.value
}

const getCampusPictures = async () => {
  const { results } = await useApi().$get<IResponse<ICampusPicture>>(
    `institute-experience/CampusPictureList/`,
    {
      params: {
        branch_slug: route.params?.slug,
      },
    }
  )
  return (campusPictures.value = results)
}

const getBranchReviews = async () => {
  const { results } = await useApi().$get<IResponse<IComment>>(
    'institute-experience/FAQBranchList/',
    {
      params: {
        branch__slug: route.params?.slug as string,
      },
    }
  )

  comments.value = results
}

useAsyncData(async () => {
  return Promise.allSettled([
    getStaticPage(),
    getCampusPictures(),
    institutionStore.fetchMenu(),
    getBranchReviews(),
  ]).then((res) => {
    console.log('res', res)
  })
})

const settings = computed(() => {
  return {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1560: {
        slidesPerView: 4,
      },
    },
  }
})
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <ExperienceSectionWrapper
      :title="data?.title"
      active-route="tashkent-branch"
      v-bind="{ menu }"
      show-ads
      :has-side-bar="!isTashkentBranch"
    >
      <AdmissionsMainContent v-bind="{ data }" />
    </ExperienceSectionWrapper>

    <div class="bg-white py-7 md:py-11">
      <div class="container">
        <h2 class="text-xl md:text-2.5xl font-bold text-dark leading-130 mb-6">
          {{ $t('about_campus') }}
        </h2>
        <Transition name="fade" mode="out-in">
          <div :key="comments?.length">
            <Swiper v-if="comments?.length" v-bind="settings" class="container">
              <SwiperSlide v-for="(item, index) in comments" :key="index">
                <ExperienceCardComment :card="item" />
              </SwiperSlide>
            </Swiper>

            <CommonNoData v-else class="my-14" />
          </div>
        </Transition>
      </div>
    </div>

    <ExperienceSectionCampus :campus-pictures="campusPictures" />
  </section>
</template>

<style scoped></style>
