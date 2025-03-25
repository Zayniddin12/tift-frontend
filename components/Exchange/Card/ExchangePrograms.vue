<template>
  <nuxt-link
    :to="'/education/exchange-program/' + slug"
    class="relative transition-300 hover:-translate-y-2 bg-white group hover:cursor-pointer"
  >
    <img
      :src="cover_image"
      :alt="alt || 'image'"
      class="object-cover aspect-[278/192] w-full"
    />
    <div
      class="p-5 bg-gray-4 transition-300 group-hover:bg-white group-hover:shadow-partner-card"
    >
      <h1 class="font-semibold text-lg leading-6">{{ title }}</h1>
      <p class="mb-10 text-sm text-gray-1 font-normal mt-2 line-clamp-2">
        {{ subtitle }}
      </p>
      <button class="text-green flex items-center justify-center">
        <span>{{ $t('read_more') }}</span>
        <span class="icon-chevron text-2xl ml-1"></span>
      </button>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  alt?: string
  title: string
  cover_image?: string
  subtitle?: string
  slug: string
}

defineProps<Props>()
</script>
