<template>
  <AboutSectionWrapper
    :title="t('cooperation_news')"
    :active-route="'international-cooperation'"
    v-bind="{ menu, slug }"
    class="mb-10"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BaseSkeleton
            v-for="i in 9"
            :key="i"
            width="100%"
            height="350px"
            v-bind="{ loading }"
          />
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AboutCardNews v-for="(item, idx) in list" :key="idx" :data="item" />
        </div>

        <CommonNoData v-if="!loading && !list?.length" class="my-14" />
      </div>
    </Transition>

    <CommonSectionTitle
      :title="t('international_cooperation')"
      class="my-8 mt-14"
    />
    <Transition name="fade" mode="out-in">
      <div :key="cooperation?.length">
        <div
          v-if="cooperation?.length"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 lg:gap-y-6 lg:gap-x-12 pl-6"
        >
          <AboutCardCooperation
            v-for="(item, idx) in cooperation"
            :key="idx"
            :data="item"
          />
        </div>

        <CommonNoData v-if="!cooperation?.length" class="my-14" />
      </div>
    </Transition>
  </AboutSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'
import type { ICooporation } from '~/types/about'

interface Props {
  menu?: IMenu[]
  slug?: string
  loading?: boolean
  pageChange?: any
  list?: any[]
  paginationData?: any
  params?: any
  currentPage?: number
  cooperation?: ICooporation[]
}
defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped></style>
