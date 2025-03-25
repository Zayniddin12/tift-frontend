<script setup lang="ts">
import type { IEmployment } from '~/types/services/education.types'

interface Props {
  card: IEmployment
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="'/institute-experience/faculties/' + card.id"
    class="relative bg-white w-[225px] md:w-[278px] max-h-[296px] flex items-center flex-col pb-5 shadow-partner-card group transition-300 hover:cursor-pointer hover:-translate-y-3"
  >
    <img
      v-if="card.photo"
      v-lazy="card.photo"
      alt="user of image"
      class="w-[193px] h-[193px] md:w-[238px] md:h-[238px] inline-block object-cover border border-gray-3 aspect-square transition-300 -translate-y-[60px]"
    />

    <div class="absolute bottom-5 transition-300 px-1">
      <h5
        class="mb-2 text-dark text-base md:text-xl font-bold leading-130 text-center group-hover:text-green truncate max-w-[238px] max-[800px]:max-w-[185px]"
      >
        {{ card.full_name }}
      </h5>
      <p class="text-sm font-medium leading-130 text-green md:text-center">
        {{ card.position.title }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
