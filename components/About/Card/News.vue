<script setup lang="ts">
import dayjs from 'dayjs'

import type { INewsSingle } from '~/types/news'

interface Props {
  data: INewsSingle[]
}

defineProps<Props>()
</script>

<template>
  <div class="group">
    <NuxtLink
      :to="`/news/${data?.slug}`"
      class="event-card transition-all duration-500 block group-hover:-translate-y-2 h-full bg-white"
    >
      <div
        class="aspect-video md:aspect-[278/192] relative md:h-[260px] w-full"
      >
        <img
          v-lazy="data?.cover_image"
          class="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      </div>
      <div class="bg-white p-4 md:p-5 h-[176px] flex flex-col justify-between">
        <h3
          class="text-xl text-dark font-semibold leading-130 line-clamp-2 md:ine-clamp-1 group-hover:text-green"
        >
          {{ data?.title }}
        </h3>
        <p
          class="text-gray-1 leading-140 text-sm font-normal line-clamp-4 md:line-clamp-2 mt-2 mb-3 md:mb-5"
        >
          {{ data?.subtitle }}
        </p>
        <div
          class="flex-y-center gap-1.5 text-xs text-gray-1 font-medium leading-normal"
        >
          <div class="flex-y-center gap-1">
            <i class="icon-calendar text-base text-gray-1 leading-4" />
            {{ dayjs(data?.published_at).format('DD.MM.YYYY') }}
          </div>
          <span class="w-1 h-1 rounded-full bg-gray-1" />
          <span> {{ data?.category?.title }} </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.event-card {
  box-shadow: 0px 2.767256498336792px 2.2138051986694336px 0px #00000008,
    0px 6.650102138519287px 5.32008171081543px 0px #00000005,
    0px 12.521552085876465px 10.017241477966309px 0px #00000005,
    0px 22.3363094329834px 17.869047164916992px 0px #00000004,
    0px 41.777610778808594px 33.422088623046875px 0px #00000003,
    0px 100px 80px 0px #00000002;
}

.event-card:hover {
  box-shadow: 0px 12px 28px 0px #5e5e5e33;
}
</style>
