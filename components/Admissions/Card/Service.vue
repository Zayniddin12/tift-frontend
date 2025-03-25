<template>
  <nuxt-link :to="link">
    <div
      class="border border-gray-300 p-4 md:p-5 flex flex-col group cursor-pointer h-full"
      :class="`${bgClass} ${
        contentPosition === 'left' ? 'items-start' : 'items-end'
      }`"
    >
      <img
        v-if="icon"
        v-lazy="icon"
        :alt="`icon of ${title}`"
        class="max-w-12 max-h-12 object-cover"
      />

      <h1
        class="font-semibold text-lg mt-5 mb-2 transition-all group-hover:text-green"
      >
        {{ title }}
      </h1>

      <p class="font-normal text-sm text-gray-1">{{ description }}</p>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  contentPosition: 'left' | 'right'
  bgClass: string
  link?: string
}

defineProps<Props>()
</script>
