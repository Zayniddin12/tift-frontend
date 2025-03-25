<template>
  <div>
    <BaseSkeleton height="68px" width="100%" v-bind="{ loading }">
      <p
        class="mb-1.5 text-white text-4xl md:text-[52px] !leading-130 !font-[800] !md:font-extrabold !uppercase"
      >{{item?.value}}</p>
    </BaseSkeleton>
    <hr class="w-[100px] h-0.5 bg-white/2 mb-3 md:mb-5" />
    <BaseSkeleton height="20px" width="100%" v-bind="{ loading }">
      <div
        class="mb-1 text-base descr text-white/60 leading-130 font-bold uppercase"
        v-html="item?.title"
      />
    </BaseSkeleton>
  </div>
</template>

<script setup lang="ts">
import type { IStatistics } from '~/types/main'

interface Props {
  item?: IStatistics
  loading?: boolean
}

defineProps<Props>()
</script>
<style scoped>
.descr {
  font-family: Inter, sans-serif !important;
}
</style>
