<template>
  <div class="bg-white">
    <CommonSectionWrapper
      :title="t('discover_more')"
      class="-mt-7 md:mt-0 !pb-[90px]"
    >
      <div class="grid md:grid-cols-3">
        <MainCardDiscover
          v-for="(item, idx) in contents"
          :key="idx"
          v-bind="{ item }"
          :class="{
            'max-md:pt-0 md:pl-0': idx === 0,
            'max-md:pb-0 md:pr-0 max-md:border-b-0 md:border-r-0':
              idx === contents.length - 1,
          }"
        />
      </div>
    </CommonSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { contents } from '~/data/data'

const { t } = useI18n()
</script>

<style scoped></style>
