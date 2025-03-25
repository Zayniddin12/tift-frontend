<template>
  <NuxtLink
    :to="`/news/${item?.slug ?? 'qwe'}`"
    class="py-4 md:py-5 group w-full"
  >
    <div
      class="flex-y-center gap-1.5 text-gray-1 text-xs font-medium leading-normal"
    >
      <time class="flex-y-center gap-1">
        <BaseSkeleton width="16px" height="16px" v-bind="{ loading }">
          <i class="icon-calendar text-gray-1 text-base leading-4" />
        </BaseSkeleton>
        <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
          {{ dayjs(item?.published_at).format('DD.MM.YYYY') }}
        </BaseSkeleton>
      </time>
      <span v-if="!loading" class="w-1 h-1 rounded-full bg-gray-2" />
      <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
        <span> {{ item?.category?.title }} </span>
      </BaseSkeleton>
    </div>
    <BaseSkeleton
      width="100%"
      height="40px"
      v-bind="{ loading }"
      preloader-class="my-2"
    >
      <h3
        class="line-clamp-2 text-dark text-base font-semibold leading-130 my-2 group-hover:text-green transition-300"
      >
        {{ item?.title }}
      </h3>
    </BaseSkeleton>

    <BaseSkeleton width="100%" height="60px" v-bind="{ loading }">
      <p
        class="text-sm text-gray-1 font-normal leading-140 line-clamp-3 group-hover:text-green/60 transition-300"
      >
        {{ item?.subtitle }}
      </p>
    </BaseSkeleton>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { INews } from '~/types/news'

interface Props {
  item?: INews
  loading?: boolean
}
defineProps<Props>()
</script>
