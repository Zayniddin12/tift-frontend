<template>
  <div class="px-3">
    <h1 class="mt-8 mb-2 text-xl text-dark font-semibold leading-130">
      {{ title }}
    </h1>
    <p
      class="text-gray-1 text-sm leading-130 group-hover:text-white line-clamp-2 mb-10"
    >
      {{ subtitle }}
    </p>
    <nuxt-link :to="link" class="inline-flex items-center justify-center group">
      <span class="text-base leading-140 font-medium text-green">{{
        $t(text)
      }}</span>
      <i
        class="icon-chevron text-2xl text-green transition-300 group-hover:translate-x-1"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  link: string
  text: string
}

defineProps<Props>()
</script>
