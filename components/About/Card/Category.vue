<template>
  <nuxt-link
    :to="link"
    class="relative h-[110px] p-5 bg-white group shadow-partner-card transition-300 transition-all hover:bg-green hover:cursor-pointer"
  >
    <h1
      class="text-base leading-130 text-dark font-semibold group-hover:text-white"
    >
      {{ title }}
    </h1>

    <!-- pattern bottom   -->
    <span
      class="absolute bottom-0 left-5 w-10 h-0.5 bg-green group-hover:bg-white"
    />
    <!--    pattern image -->

    <img
      src="/svg/half-building.svg"
      alt="Building patter"
      class="absolute right-0 bottom-0"
    />
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  title: number
  slug: string
  order?: string
  link?: string
}

defineProps<Props>()
</script>

<style scoped>
img {
  filter: invert(45%) sepia(4%) saturate(465%) hue-rotate(175deg)
    brightness(98%) contrast(90%);
}
.card:hover img {
  filter: invert(100%) sepia(20%) saturate(1176%) hue-rotate(177deg)
    brightness(90%) contrast(90%);
}
</style>
