<template>
  <div class="bg-gray-4 relative overflow-hidden z-0 pb-16">
    <div class="relative z-10">
      <CommonSectionWrapper
        :title="t('about_the_institute')"
        :description="t('about_description')"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-3 md:mt-0 md:gap-6"
        >
          <MainCardArticle
            v-for="(item, idx) in aboutCardsData"
            :key="idx"
            :data="item"
          />
        </div>
      </CommonSectionWrapper>
    </div>
    <nuxt-img
      src="/svg/tiftLogo-pattern.svg"
      alt="Logo pattern"
      class="absolute -right-[55px] -bottom-[156px] w-[657px] h-[662.63px]"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { aboutCardsData } from '~/data/data'

const { t } = useI18n()
</script>

<style scoped></style>
