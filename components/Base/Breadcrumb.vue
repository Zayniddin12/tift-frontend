<template>
  <div class="bg-gray-6 py-3 hidden-on-print hidden md:block">
    <div class="container flex items-center flex-wrap">
      <NuxtLink
        to="/"
        class="text-gray-1 text-sm font-medium flex items-center hover:text-green transition"
      >
        <i class="icon-home text-gray-1 text-xl mr-2"></i>
        {{ $t('main') }}
      </NuxtLink>
      <span class="w-1 h-1 rounded-full bg-green block mx-3"></span>
      <template v-for="(link, index) in routes" :key="index">
        <NuxtLink
          v-if="index !== routes.length - 1"
          :to="link.path"
          class="text-gray-1 text-sm font-medium flex items-center hover:text-green transition capitalize"
        >
          {{ $t(link.name) }}
        </NuxtLink>
        <span
          v-if="index !== routes.length - 1"
          class="w-1 h-1 rounded-full bg-green block mx-3 capitalize"
        ></span>
        <span
          v-if="index === routes.length - 1"
          class="text-dark text-sm font-medium capitalize"
        >
          {{ link.name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  routes: {
    name: string
    path: string
  }[]
}
defineProps<Props>()
</script>
