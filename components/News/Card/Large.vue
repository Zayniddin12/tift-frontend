<template>
  <NuxtLink
    :to="`/news/${item?.slug ?? 'qwe'}`"
    class="py-4 md:py-5 border-b border-gray-3/60 group bg-no-repeat bg-cover bg-center p-7 relative"
    :style="`background-image: url(${!loading ? item?.cover_image : ''})`"
    :class="{ 'pointer-events-none !border-b-0': loading }"
  >
    <div class="absolute bottom-6 left-7 right-7">
      <div
        class="flex-y-center gap-1.5 text-gray-4 text-xs font-medium leading-normal relative z-1"
      >
        <time class="flex-y-center gap-1">
          <BaseSkeleton width="16px" height="16px" v-bind="{ loading }">
            <i class="icon-calendar text-gray-4 text-base leading-4" />
          </BaseSkeleton>
          <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
            {{ dayjs(item?.published_at).format('DD.MM.YYYY') }}
          </BaseSkeleton>
        </time>
        <span v-if="!loading" class="w-1 h-1 rounded-full bg-gray-2" />
        <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
          <span>{{ item?.category?.title }} </span>
        </BaseSkeleton>
      </div>
      <BaseSkeleton
        width="100%"
        height="109px"
        v-bind="{ loading }"
        preloader-class="mt-2 pb-3"
      >
        <h3
          class="line-clamp-3 text-white text-2.5xl font-bold leading-130 mt-2 mb-3 transition-300 relative z-1"
        >
          {{ item?.title }}
        </h3>
      </BaseSkeleton>
      <BaseSkeleton width="100%" height="44px" v-bind="{ loading }">
        <p
          class="text-base text-gray-3 font-normal leading-140 line-clamp-2 transition-300 relative z-1"
        >
          {{ item?.subtitle }}
        </p>
      </BaseSkeleton>
    </div>
    <span
      v-if="!loading"
      class="news-card-overlay absolute inset-0 z-0 group-hover:opacity-0 transition-300"
    />
    <span
      v-if="!loading"
      class="news-card-hover absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-300"
    />
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

<style scoped>
.news-card-overlay {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0) 25%,
    rgba(16, 22, 28, 0.4) 51.04%,
    #10161c 100%
  );
}

.news-card-hover {
  background: linear-gradient(
    180deg,
    rgba(17, 52, 136, 0) 25%,
    #1b6c28,
    #33B34A
  );
}
</style>
