<script setup lang="ts">
// css
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import { useMainStore } from '~/store/main'

const { t } = useI18n()

const settings = computed(() => {
  return {
    spaceBetween: 0,
    grabCursor: true,
    keyboard: { enabled: true },
    slidesPerView: 2,
    breakpoints: {
      '640': {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      '1024': {
        slidesPerView: 6,
        spaceBetween: 0,
      },
      '1560': {
        slidesPerView: stories.value?.length < 5 ? 6 : 6,
        spaceBetween: 0,
      },
      '1920': {
        slidesPerView: stories.value?.length < 5 ? 6 : 6,
        spaceBetween: 0,
      },
      '2560': {
        slidesPerView: 10,
        spaceBetween: 0,
      },
    },
  }
})

const mainStore = useMainStore()
const loading = ref(false)

const fetchStories = async () => {
  try {
    loading.value = true
    await mainStore.fetchStoriesOfStudents()
  } finally {
    loading.value = false
  }
}

fetchStories()

const stories = computed(() => {
  return loading.value
    ? Array.from({ length: 12 })
    : mainStore.storiesOfStudents
})
</script>

<template>
  <CommonSectionWrapper
    v-if="stories?.length"
    :title="t('stories_of_our_students')"
    class="bg-white pb-16"
  >
    <template #after>
      <ClientOnly>
        <Swiper
          v-bind="settings"
          class="!py-10 -my-10"
          :class="{ 'container !pl-4': stories?.length < 5 }"
        >
          <SwiperSlide v-for="(item, index) in stories" :key="index">
            <MainCardStory v-if="stories?.length" v-bind="{ item, loading }" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </template>
  </CommonSectionWrapper>
</template>

<style scoped>

.swiper-slide{
  width: 100%;
  height: 100%;
}

</style>
