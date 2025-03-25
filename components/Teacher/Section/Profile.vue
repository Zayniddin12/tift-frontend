<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRoute } from 'vue-router'

import { useCommonStore } from '~/store/common'

const route = useRoute()
const store = useCommonStore()
// fetch

const fetchTeachers = async () => {
  await store.getEmployment()
}

fetchTeachers()

const getTeachers = computed(() => store.employmentLists)

const settings = computed(() => {
  return {
    spaceBetween: 100,
    grabCursor: true,
    keyboard: { enabled: true },
    slidesPerView: 2,
    centeredSlides: true,
    breakpoints: {
      '640': {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 10,
      },
      '768': {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 10,
      },
      '1024': {
        centeredSlides: false,
        slidesPerView: 4,
        spaceBetween: 24,
      },
      '1440': {
        centeredSlides: false,
        slidesPerView: 5,
        spaceBetween: 24,
      },
      '1560': {
        centeredSlides: false,
        slidesPerView: 5.5,
        spaceBetween: 24,
      },
      '1700': {
        centeredSlides: false,
        slidesPerView: 6,
        spaceBetween: 24,
      },
    },
  }
})
</script>

<template>
  <section v-if="getTeachers.length" class="py-7 md:py-11 overflow-hidden">
    <h1
      class="container mb-[80px] md:mb-[100px] text-dark text-xl md:text-2.5xl font-bold leading-130"
    >
      {{ $t('our_teachers') }}
    </h1>
    <Swiper v-bind="settings" class="!overflow-visible">
      <SwiperSlide v-for="(item, idx) in getTeachers" :key="idx">
        <TeacherCard :card="item" class="mx-auto" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped></style>
