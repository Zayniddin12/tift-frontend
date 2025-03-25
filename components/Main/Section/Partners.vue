<script setup lang="ts">
// css
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import { useMainStore } from '~/store/main'

const { t } = useI18n()

const settings = computed(() => {
  return {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 24,
    slidesPerView: 'auto',
    breakpoints: {
      '640': {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      '1024': {
        slidesPerView: 6,
        spaceBetween: 24,
      },
      '1560': {
        slidesPerView: 7,
        spaceBetween: 24,
      },
      '1920': {
        slidesPerView: 8,
        spaceBetween: 24,
      },
    },
  }
})

const store = useMainStore()
const partners = computed(() => store.partnerList)
const loading = computed(() => store.partnerListLoading)
store.fetchPartnerList()
</script>

<template>
  <CommonSectionWrapper :title="t('our_partners')" class="pb-16">
    <template #after>
      <Swiper v-bind="settings" class="!py-10 -my-10 2xl:container">
        <SwiperSlide
          v-for="(item, index) in loading ? 6 : partners"
          :key="index"
        >
          <MainCardPartners
            v-bind="{ item, loading }"
            class="[1560px]:!mx-auto"
          />
        </SwiperSlide>
      </Swiper>
    </template>
  </CommonSectionWrapper>
</template>

<style>
.swiper-wrapper {
  margin-block: auto !important;
}
</style>
