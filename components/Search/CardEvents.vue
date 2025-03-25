<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { IEvents } from '~/types/events'

interface Props {
  item?: IEvents
  loading?: boolean
}
defineProps<Props>()

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/events/${item?.slug ?? 'qwe'}`"
    class="transition-all flex md:flex-row flex-col duration-500 block group-hover:-translate-y-2 group"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="aspect-[260/172] w-full sm:max-w-[260px] relative">
      <div
        v-if="item?.cover_image"
        class="inline-flex items-center flex-col py-2 px-4 bg-green border-r border-b border-white/30 relative z-1"
      >
        <time class="text-white text-xl leading-130 font-bold">
          {{ dayjs(item?.event_date).format('DD') }}
        </time>
        <time class="text-white/80 text-sm leading-130 font-medium -mt-0.5">
          {{ dayjs(new Date()).locale(locale).format('MMM') }}
        </time>
      </div>
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <img
          v-lazy="item?.cover_image"
          class="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      </BaseSkeleton>
    </div>
    <div
      class="min-h-[172px] w-full h-full bg-gray-4 border-b border-borderColor-1 group-hover:border-green p-5 transition-300 group-hover:bg-green"
    >
      <BaseSkeleton width="100%" height="24px" v-bind="{ loading }">
        <h3
          class="text-lg text-dark font-semibold leading-130 line-clamp-1 transition-300 group-hover:text-white"
        >
          {{ item?.title }}
        </h3>
      </BaseSkeleton>
      <BaseSkeleton
        height="40px"
        width="100%"
        v-bind="{ loading }"
        preloader-class="mt-2 mb-10"
      >
        <p
          class="text-gray-1 leading-140 text-sm font-normal line-clamp-2 mt-2 mb-10 transition-300 group-hover:text-white"
        >
          {{ item?.subtitle }}
        </p>
      </BaseSkeleton>
      <BaseSkeleton width="150px" height="24px" v-bind="{ loading }">
        <div
          class="flex-y-center gap-1 text-green text-base font-medium leading-140 transition-300 group-hover:text-white"
        >
          {{ item?.button_text || $t('more') }}
          <i
            class="text-2xl leading-6 icon-chevron text-green transition-300 group-hover:text-white"
          />
        </div>
      </BaseSkeleton>
    </div>
  </NuxtLink>
</template>
