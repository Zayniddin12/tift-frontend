<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { IEvents } from '~/types/events'

interface Props {
  item?: IEvents
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/events/${item?.slug ?? 'qwe'}`"
    class="event-card grid grid-cols-3 transition-all duration-500 md:block group-hover:-translate-y-2 group hover:-translate-y-2 hover:cursor-pointer"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="col-span-1 h-full md:h-auto aspect-[278/192] w-full relative">
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
          v-if="item?.cover_image"
          v-lazy="item?.cover_image"
          class="absolute inset-0 w-full h-full object-cover"
          alt="Image of Event"
        />


      </BaseSkeleton>
    </div>

    <div class="col-span-2 bg-white p-3 md:p-5 flex align-middle flex-col">
      <BaseSkeleton width="100%" height="24px" v-bind="{ loading }">
        <h3
          class="text-base lg:text-lg text-dark font-semibold leading-130 line-clamp-1 group-hover:text-green"
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
          class="text-gray-1 leading-140 text-sm font-normal line-clamp-4 md:line-clamp-2 mt-2 mb-3 md:mb-10 h-[40px] "
        >
          {{ item?.subtitle }}
        </p>
      </BaseSkeleton>
      <BaseSkeleton
        width="150px"
        height="24px"
        style="display: flex; align-items: center"
        class="!flex !items-center"
        v-bind="{ loading }"
      >
        <div
          class="flex items-center gap-1 text-green text-base font-medium leading-140"
        >
          {{ item?.button_text ?? $t('more') }}
          <i class="text-2xl leading-6 icon-chevron text-green" />
        </div>
      </BaseSkeleton>
    </div>
  </NuxtLink>
</template>

<style scoped>
.event-card {
  box-shadow: 0 2.76726px 2.21381px 0 rgba(0, 0, 0, 0.03),
    0 6.6501px 5.32008px 0 rgba(0, 0, 0, 0.02),
    0 12.52155px 10.01724px 0 rgba(0, 0, 0, 0.02),
    0 22.33631px 17.86905px 0 rgba(0, 0, 0, 0.01),
    0 41.77761px 33.42209px 0 rgba(0, 0, 0, 0.01),
    0 100px 80px 0 rgba(0, 0, 0, 0.01);
}
.event-card:hover {
  box-shadow: 0 12px 28px 0 rgba(94, 94, 94, 0.2);
}
</style>
