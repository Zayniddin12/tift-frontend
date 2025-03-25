<script setup lang="ts">
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

interface Props {
  employees?: string
}

defineProps<Props>()

const { t } = useI18n()
const settings = computed(() => {
  return {
    loop: true,
    spaceBetween: 0,
    grabCursor: true,
    slidesPerView: 'auto',
  }
})
</script>

<template>
  <div>
    <CommonSectionWrapper :title="t('our_team')">
      <template #after>
        <Swiper v-bind="settings">
          <SwiperSlide
            v-for="(card, idx) in [...employees, ...employees]"
            :key="idx"
            class="!w-[240px]"
          >
            <TeamCardProfile v-bind="{ ...card }" />
          </SwiperSlide>
        </Swiper>
      </template>
    </CommonSectionWrapper>

    <div class="container pt-6">
      <nuxt-link
        to="/about-us/team"
        class="inline-flex items-center space-x-1 hover:cursor-pointer group"
      >
        <span
          class="text-dark text-sm leading-130 font-semibold transition-320 group-hover:text-green"
        >
          {{ $t('see_all_members') }}</span
        >
        <i
          class="icon-chevron text-dark text-2xl transition-320 group-hover:text-green"
        />
      </nuxt-link>
    </div>
  </div>
</template>
