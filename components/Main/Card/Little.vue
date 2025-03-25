<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import type { ILittleCardData } from '~/types/education'

interface Props {
  title: string
  data: ILittleCardData
  active?: boolean
}

defineProps<Props>()
</script>
<template>
  <div>
    <div
      class="flex relative items-start flex-col h-[164px] justify-center card-bg p-2 2xl:p-6"
    >
      <div class="absolute top-6">
        <h1
          class="text-white uppercase md:text-base font-bold mb-1 xl:text-xl text-xl"
        >
          {{ $t(`${title}`) }}
        </h1>
        <div class="w-20 h-1 bg-gray-700"></div>
      </div>
      <slot></slot>
      <img
        src="/svg/tiftCardLittle-rectangles.svg"
        alt="Patterns"
        class="absolute right-0 h-[164px] z-0"
      />
    </div>
    <div class="block lg:hidden">
      <CollapseTransition v-if="data">
        <MainCardCollapseContent
          v-if="data && active"
          :title="$t(`${data.type}`)"
          :content="data.description"
          :image="data.image"
        />
      </CollapseTransition>
    </div>
  </div>
</template>
<style scoped>
.card-bg {
  background: linear-gradient(113.8deg, #2e4259 -75.53%, #10161c 96.48%);
}
</style>
