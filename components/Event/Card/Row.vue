<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <NuxtLink to="/events/12312" class="transition-300 group flex">
    <div class="aspect-[260/172] relative w-[260px] shrink-0">
      <div
        class="inline-flex items-center flex-col py-2 px-4 bg-red border-r border-b border-white/30 relative z-1"
      >
        <time class="text-white text-xl leading-130 font-bold">
          {{ dayjs(new Date()).format('DD') }}
        </time>
        <time class="text-white/80 text-sm leading-130 font-medium -mt-0.5">
          {{ dayjs(new Date()).locale(locale).format('MMM') }}
        </time>
      </div>
      <img
        v-lazy="'https://picsum.photos/300'"
        class="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
    </div>
    <div class="bg-gray-4 px-5 py-7 w-full group-hover:bg-green transition-300">
      <h3
        class="text-xl group-hover:text-white text-dark font-semibold leading-130 line-clamp-1"
      >
        Open days
      </h3>
      <p
        class="group-hover:text-gray-3 text-gray-1 leading-140 text-sm font-normal line-clamp-2 mt-2 mb-10"
      >
        In addition to our regular campus visits, this event is a great
        opportunity to explore the University even more.
      </p>
      <div
        class="flex-y-center gap-1 text-green group-hover:text-white text-base font-medium leading-140"
      >
        Join our next open day
        <i
          class="text-2xl leading-6 icon-chevron group-hover:text-white text-green"
        />
      </div>
    </div>
  </NuxtLink>
</template>
