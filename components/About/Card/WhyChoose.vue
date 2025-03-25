<script setup lang="ts">
import type { IReason } from '~/types/about'

interface Props {
  data: IReason
}

defineProps<Props>()
</script>

<template>
  <div class="group">
    <NuxtLink
      class="event-card h-full bg-white transition-all duration-500 block"
    >
      <div
        class="aspect-[16/9] md:aspect-[278/192] relative md:h-[260px] w-full"
      >
        <img
          v-lazy="data?.image"
          class="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      </div>
      <div class="bg-white p-4 md:p-5">
        <h3
          class="text-xl text-dark font-semibold leading-130 line-clamp-2 md:line-clamp-1"
        >
          {{ data.title }}
        </h3>
        <p
          class="text-gray-1 leading-140 text-sm font-normal line-clamp-4 mt-2"
        >
          {{ data.subtitle }}
        </p>
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
