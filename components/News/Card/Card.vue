<script setup lang="ts">
import dayjs from 'dayjs'

import type { INews } from '~/types/news'
import { formatNumberSpace } from '~/utils'

interface Props {
  isWork?: boolean
  item?: INews
  loading?: boolean
  link?: string
}
withDefaults(defineProps<Props>(), {
  link: 'news',
})
</script>

<template>
  <NuxtLink
    :to="`/${link}/${item?.slug ?? 'qwe'}`"
    class="group hover:-translate-y-2 transition-300 flex flex-col"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="w-full">
      <BaseSkeleton
        preloader-class="aspect-[278/186]"
        width="100%"
        height="100%"
        v-bind="{ loading }"
      >
        <img
          v-lazy="item?.cover_image"
          class="object-cover w-full aspect-[278/186]"
          alt=""
        />
      </BaseSkeleton>
    </div>
    <div
      class="flex flex-col justify-between gap-5 p-5 bg-white news-card transition-300 h-full"
    >
      <div>
        <span
          v-if="isWork && !loading"
          class="py-1 px-2 border-gray-3 border bg-white text-xs font-semibold leading-130 text-gray-1 mb-3 inline-block"
        >
          {{ item?.category?.title }}
        </span>
        <BaseSkeleton
          width="100%"
          height="52px"
          preloader-class="mb-2"
          v-bind="{ loading }"
        >
          <h3
            class="line-clamp-2 text-dark font-semibold leading-130 text-xl mb-2 group-hover:text-green transition-300"
          >
            {{ item?.title }}
          </h3>
        </BaseSkeleton>
        <BaseSkeleton width="100%" height="18px" v-bind="{ loading }">
          <p class="text-gray-1 text-sm font-medium leading-130">
            {{ item?.subtitle }}
          </p>
        </BaseSkeleton>
      </div>
      <div
        class="flex-y-center gap-1.5 text-xs text-gray-1 font-medium leading-normal"
      >
        <div class="flex-y-center gap-1">
          <BaseSkeleton width="16px" height="16px" v-bind="{ loading }">
            <i class="icon-calendar text-base text-gray-1 leading-4" />
          </BaseSkeleton>
          <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
            {{ dayjs(item?.published_at).format('DD.MM.YYYY') }}
          </BaseSkeleton>
        </div>
        <span v-if="!loading" class="w-1 h-1 rounded-full bg-gray-1" />
        <div v-if="isWork" class="flex-y-center gap-1">
          <BaseSkeleton width="16px" height="16px" v-bind="{ loading }">
            <i class="icon-eye text-base text-gray-1 leading-4" />
          </BaseSkeleton>
          <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
            {{ formatNumberSpace(item?.views_count) }}
          </BaseSkeleton>
        </div>
        <BaseSkeleton v-else width="100px" height="16px" v-bind="{ loading }">
          <span> {{ item?.category?.title }} </span>
        </BaseSkeleton>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.news-card {
  box-shadow: 0 2.76726px 2.21381px 0 rgba(0, 0, 0, 0.03),
    0 6.6501px 5.32008px 0 rgba(0, 0, 0, 0.02),
    0 12.52155px 10.01724px 0 rgba(0, 0, 0, 0.02),
    0 22.33631px 17.86905px 0 rgba(0, 0, 0, 0.01),
    0 41.77761px 33.42209px 0 rgba(0, 0, 0, 0.01),
    0 100px 80px 0 rgba(0, 0, 0, 0.01);
}
.news-card:hover {
  box-shadow: 0 12px 28px 0 rgba(94, 94, 94, 0.2);
}
</style>
