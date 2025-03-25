<template>
  <div class="bg-gray-5">
    <CommonSectionWrapper :title="t('news_and_events')">
      <div class="grid grid-cols-2 md:grid-cols-12 gap-6 mt-10 mb-16">
        <div
          class="order-1 md:col-span-3 flex items-center flex-col divide-y divide-gray-3/60"
        >
          <NewsCardSmall v-for="i in 3" :key="i" />
        </div>
        <NewsCardLarge
          class="order-3 md:order-2 col-span-2 h-96 md:h-auto md:col-span-6 my-5"
        />
        <div
          class="order-2 md:col-span-3 flex items-center flex-col divide-y divide-gray-3/60"
        >
          <NewsCardSmall v-for="i in 3" :key="i" />
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <EventCard v-for="i in 4" :key="i" />
      </div>
    </CommonSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
