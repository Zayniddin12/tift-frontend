<script setup lang="ts">
import dayjs from 'dayjs'

import type { INews } from '~/types/news'
import { formatNumberSpace } from '~/utils'

interface Props {
  item?: INews
  link?: string
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/news/${item?.slug ?? 'qwe'}`"
    class="group transition-300 flex flex-col md:flex-row"
    :class="{ 'pointer-events-none': loading }"
  >
    <BaseSkeleton
      preloader-class="aspect-[278/186]"
      width="100%"
      height="100%"
      v-bind="{ loading }"
    >
        <img
        v-lazy="item?.cover_image"
        class="object-cover w-full sm:max-w-[260px] aspect-[260/172]"
        alt=""
      />
    </BaseSkeleton>
    <div
      class="min-h-[172px] flex flex-col justify-between gap-5 p-5 border-b border-borderColor-1 group-hover:border-green bg-gray-4 group-hover:bg-green news-card transition-300 !h-full !w-full"
    >
      <div>
        <BaseSkeleton
          width="100%"
          height="52px"
          preloader-class="mb-2"
          v-bind="{ loading }"
        >
          <h3
            class="line-clamp-2 text-dark font-semibold leading-130 text-xl mb-2 group-hover:text-white transition-300"
          >
            {{ item?.title }}
          </h3>
        </BaseSkeleton>
        <BaseSkeleton width="100%" height="18px" v-bind="{ loading }">
          <p
            class="text-gray-1 text-sm font-medium leading-130 group-hover:text-white transition-300"
          >
            {{ item?.subtitle }}
          </p>
        </BaseSkeleton>
      </div>
      <div
        class="flex-y-center gap-1.5 text-xs text-gray-1 font-medium leading-normal"
      >
        <div class="flex-y-center gap-1 group-hover:text-white transition-300">
          <i
            class="icon-calendar text-base text-gray-1 leading-4 group-hover:text-white transition-300"
          />
          <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
            {{ dayjs(item?.published_at).format('DD.MM.YYYY') }}
          </BaseSkeleton>
        </div>

        <BaseSkeleton width="100px" height="16px" v-bind="{ loading }">
          <span class="group-hover:text-white transition-300">
            {{ item?.category?.title }}
          </span>
        </BaseSkeleton>
      </div>
    </div>
  </NuxtLink>
</template>
