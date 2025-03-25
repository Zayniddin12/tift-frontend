<template>
  <div class="bg-white card-shadow relative">
    <nuxt-link
      :to="`/about-us/international-cooperation/${data.id}`"
      class="block flex-shrink-0 absolute -left-7 top-1/2 -translate-y-1/2 bg-white border border-gray-100"
    >
      <img v-if="data.logo" v-lazy="data.logo" class="w-[88px] h-[88px]" :alt="data.title" />
    </nuxt-link>
    <div
      class="bg-white px-3 pl-[80px] h-[112px] flex items-center w-full card-bg"
    >
      <div>
        <nuxt-link
          :to="`/about-us/international-cooperation/${data.id}`"
          class="font-semibold text-base md:text-xl transition-all duration-300 hover:text-green cursor-pointer"
        >
          {{ data.title }}
        </nuxt-link>
        <p class="text-gray-1 text-xs font-medium leading-4 mt-2 line-clamp-2">
          {{ data.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICooporation } from '~/types/about'

interface Props {
  data: ICooporation
}

defineProps<Props>()
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
