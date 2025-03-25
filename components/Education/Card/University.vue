<script setup lang="ts">
interface Props {
  image: string
  title: string
  subtitle: string
  logo?: string
}

defineProps<Props>()
</script>

<template>
  <section
    class="relative bg-white shadow-partner-card px-5 py-3 md:py-[22px] md:pl-[80px] pr-5"
  >
    <div
      class="aspect-square max-h-[88px] mb-4 md:mb-0 md:w-[88px] md:h-[88px] md:absolute top-1/2 -left-7 overflow-hidden md:translate-y-[-50%]"
    >
      <img
        :src="image || logo"
        :alt="'University of ' + title"
        class="w-full h-full object-cover aspect-square"
      />
    </div>

    <h1 class="mb-2 text-xl leading-130 text-dark font-semibold">
      {{ title }}
    </h1>
    <p class="text-xs leading-140 text-gray-1 line-clamp-2">{{ subtitle }}</p>
  </section>
</template>

<style scoped></style>
