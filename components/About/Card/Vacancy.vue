<script setup lang="ts">
import type { IVacancy } from '~/types/about'

interface Props {
  data: IVacancy
}

const props = defineProps<Props>()

const getInfo = computed(() => {
  return [
    {
      icon: 'icon-clock',
      value: props.data?.work_time,
    },
    {
      icon: 'icon-map-pin',
      value: props.data?.region?.name,
    },
  ]
})
</script>

<template>
  <nuxt-link
    :to="`/about-us/vacancies/${data?.id}`"
    class="pt-5 pb-4 bg-white shadow-partner-card group hover:cursor-pointer"
  >
    <div class="px-5">
      <h1
        class="mb-2 text-base font-semibold leading-130 line-clamp-2 group-hover:text-green"
      >
        {{ data?.title }}
      </h1>
      <hr class="h-0.5 w-[92px] bg-gray-3 mb-4" />

      <ul class="flex mb-4 lg:mb-9">
        <li
          v-for="(item, idx) in getInfo"
          :key="idx"
          class="space-x-2 first:mr-4 flex items-center"
        >
          <i :class="item.icon" class="text-green text-base" />
          <p class="font-medium text-gray-1 text-xs leading-130">
            {{ item.value }}
          </p>
        </li>
      </ul>
    </div>

    <div
      v-if="data.minPrice || data.maxPrice"
      class="flex items-center py-1.5 px-5 bg-gray-4 space-x-2"
    >
      <div class="flex w-6 items-center justify-center p-[3px] bg-green">
        <i class="icon-cash text-white text-sm" />
      </div>
      <p class="text-green leading-130 font-semibold text-sm line-clamp-2">
        {{ data.minPrice + ' - ' + data.maxPrice }}$
      </p>
    </div>
  </nuxt-link>
</template>
