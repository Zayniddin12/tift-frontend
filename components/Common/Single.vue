<template>
  <section class="mb-12">
    <div
      class="sm:h-[444px] w-full bg-center bg-no-repeat bg-cover aspect-square max-sm:bg-[length:100%_auto]"
      :style="`background-image: url(${
        data?.background_image || data?.cover_image || '/svg/tiftDefault.svg'
      })`"
    >
      <div class="absolute w-full sm:h-[444px] bg-dark/60"></div>
    </div>
    <div
      class="bg-white wrapper-bg relative container md:-top-[72px] pb-5 md:pb-10"
    >
      <button
        v-show="!noBack"
        class="icon-arrow hidden-print absolute top-3 md:top-10 left-4 md:left-10 text-3xl cursor-pointer hover:text-green"
        @click="goBackOrGivenPath(backLink)"
      />

      <div class="md:w-3/4 mx-auto" :class="!noBack ? 'pt-12 md:pt-8' : 'pt-8'">
        <div class="flex items-start justify-between gap-6">
          <div>
            <div
              v-if="showSingleInfo && data?.cover_image"
              class="flex-y-center gap-1.5 mb-3 text-gray-1 text-base font-medium leading-normal"
            >
              <div class="flex-y-center gap-1">
                <i class="icon-calendar text-gray-1 text-xl leading-5" />
                {{
                  dayjs(data?.event_date ?? data?.published_at).format(
                    'DD.MM.YYYY'
                  )
                }}
              </div>
              <span v-if="data?.views_count" class="w-1.5 h-1.5 bg-gray-2 rounded-full" />
              <div v-if="data?.views_count" class="flex-y-center gap-1">
                <i class="icon-eye text-gray-1 text-xl leading-5" />
                {{ data?.views_count }}
              </div>
              <span
                v-if="singleType"
                class="w-1.5 h-1.5 bg-gray-2 rounded-full"
              />
              <span v-if="singleType">{{ singleType }}</span>
            </div>
            <h1
              class="mb-2 text-2xl md:text-[32px] font-bold text-dark leading-130 group-hover:text-green"
            >
              {{ data?.title }}
            </h1>
            <p class="font-medium text-sm mt-3 text-gray-1 leading-tight">
              {{ data?.subtitle }}
            </p>
          </div>
          <slot name="afterHead" />
        </div>
        <div>
          <slot name="beforeContent" />
          <div
            class="text-base font-normal py-2 md:pt-6 md:pb-8 static-text"
            v-html="data?.description"
          />

          <CommonSingleActions
            :title="data?.title"
            :views="data?.views_count"
            :is-show-eye="data?.cover_image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

import type { ICooperationSingle } from '~/types/about'
import { goBackOrGivenPath } from '~/utils'

interface Props {
  data: ICooperationSingle
  singleType?: string
  showSingleInfo?: boolean
  noBack?: boolean
  backLink?: string
}

const props = defineProps<Props>()

const router = useRouter()

useSeoMeta({
  title: props.data?.title,
  description: props.data?.subtitle,
  twitterTitle: props.data?.title,
  twitterDescription: props.data?.subtitle,
  ogTitle: props.data?.title,
  ogDescription: props.data?.subtitle,
  ogImage: props.data?.background_image ?? props.data?.cover_image,
  twitterImage: props.data?.background_image ?? props.data?.cover_image,
})
</script>
<style scoped>
.wrapper-bg {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
