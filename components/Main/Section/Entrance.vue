<template>
  <section class="flex-center relative min-h-screen overflow-x-hidden">
    <Swiper v-bind="imageSettings" @swiper="setThumbsSwiper">
      <SwiperSlide v-for="(item, i) in list" :key="i">
        <video
          v-if="item?.video"
          :key="activeIndex"
          class="w-full h-full object-cover pointer-events-none"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="item?.video" type="video/mp4" />
        </video>
        <img
          v-else
          class="w-full h-full object-cover pointer-events-none"
          :src="item?.image"
          :alt="item?.title"
        />
      </SwiperSlide>
    </Swiper>

    <div class="relative z-2 container lg:px-20">
      <Swiper
        v-if="list?.length"
        v-bind="settings"
        :modules="modules"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(item, index) in list" :key="index" class="!w-full">
          <h2
            class="mb-4 font-bold text-2.5xl md:text-[50px] leading-130 uppercase text-white max-w-[400px] md:max-w-full"
          >
            {{ item?.title }}
          </h2>
          <p
            class="text-base font-normal leading-130 text-white mb-5 md:mb-11 max-w-[400px] md:max-w-full"
          >
            {{ item?.subtitle }}
          </p>
        </SwiperSlide>
      </Swiper>
      <div class="flex gap-5 max-w-[340px] w-full">
        <BaseButton
          v-if="activeUrl"
          class="w-full border !bg-white/10 !border-white/20 backdrop-blur-lg hover:!bg-white/30"
          :text="$t('explore')"
          size="large"
          @click="activeUrlClick(activeUrl)"
        />
        <BaseButton
          class="w-full"
          :text="$t('apply')"
          size="large"
          @click="$router.push('/apply')"
        />
      </div>
      <div
        v-if="list?.length > 1"
        class="flex gap-5 relative mt-3 2xl:top-2/4 2xl:-translate-y-1/2 2xl:w-full 2xl:justify-between 2xl:mt-11"
      >
        <button
          ref="prevButtonRef"
          class="entrance-prev w-8 h-8 md:w-12 md:h-12 rounded-full flex-center icon-chevron text-2xl md:text-3xl leading-6 text-white border-[0.5px] border-white hover:text-gray-1 hover:border-gray-1 transition-300 rotate-180 ml-0 2xl:-ml-16"
        ></button>
        <button
          ref="nextButtonRef"
          class="entrance-next w-8 h-8 md:w-12 md:h-12 rounded-full flex-center icon-chevron text-2xl md:text-3xl leading-6 text-white border-[0.5px] border-white hover:text-gray-1 hover:border-gray-1 transition-300 ml-0 2xl-mr-16"
        ></button>
      </div>
    </div>
    <div class="absolute inset-0 z-1 entrance-overlay pointer-events-none" />
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const prevButtonRef = ref(null)
const nextButtonRef = ref(null)

const modules = [Thumbs, Navigation, Pagination, Autoplay, EffectFade]
const settings = computed(() => ({
  loop: true,
  spaceBetween: 20,
  thumbs: { swiper: thumbsSwiper.value },
  class: 'w-full',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: nextButtonRef.value,
    prevEl: prevButtonRef.value,
  },
  modules,
}))
const imageSettings = {
  class: '!absolute inset-0 z-0 !w-full',
  loop: true,
  allowTouchMove: false,
  freeMode: true,
  modules: [Navigation, Thumbs, Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}
const { data } = await useAsyncData(
  () => useApi().$get('/common/MainSliderList/'),
  {
    server: false,
  }
)
const list = computed(() => data.value?.results)

const activeUrl = computed(() => {
  if (!list.value) return
  return list.value[activeIndex.value]?.front_url
})
const activeIndex = ref(0)
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}

const activeUrlClick = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.entrance-overlay {
  background: linear-gradient(
    180deg,
    #10161c -3.44%,
    rgba(16, 22, 28, 0.6) 50.46%,
    rgba(16, 22, 28, 0.48) 104.69%
  );
}
</style>
