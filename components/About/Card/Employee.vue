<script setup lang="ts">
import type { IEmployee } from '~/types/about'

interface Props {
  card: IEmployee
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative flex flex-col align-bottom px-5 pb-5 bg-white shadow-partner-card space-y-3 group h-[166px]"
  >
    <div class="absolute -top-[20px]">
      <img
        v-if="card?.photo"
        v-lazy="card?.photo"
        :alt="card?.full_name"
        class="w-[100px] h-[100px] object-cover aspect-square border border-gray-3"
      />
    </div>
    <div class="absolute top-20">
      <h2 class="mb-0.5 mt-auto text-dark text-sm font-bold leading-130">
        {{ card?.full_name }}
      </h2>
      <p class="text-green text-xs leading-130 font-medium line-clamp-2">
        {{ card.position?.title }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
