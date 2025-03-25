<template>
  <div
    class="bg-white shadow-partner-card group transition-all transition-300 hover:-translate-y-2 hover:cursor-pointer overflow-hidden"
  >
    <img
      :src="image"
      :alt="title"
      class="w-full aspect-[429px/260px] object-cover"
    />

    <div class="p-5">
      <h1
        class="mb-2 text-xl leading-130 font-semibold overflow-ellipsis group-hover:text-green"
      >
        {{ title }}
      </h1>
      <p class="text-gray-1 text-xxs leading-140 line-clamp-4">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<style scoped></style>
