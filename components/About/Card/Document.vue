<script setup lang="ts">
interface Props {
  document: {
    id: number
    title: string
    slug: string
    file: string
    image: string
  }
}

defineProps<Props>()
</script>

<template>
  <div class="document-card bg-white px-4 pb-4 space-y-5 shadow-partner-card">
    <div class="document-card__img">
      <img
        v-if="document.image"
        v-lazy="document.image"
        :alt="document.title"
        class="max-h-[348px] h-full w-full object-cover aspect-[16/9] md:aspect-[246/348]"
      />
    </div>
    <div class="flex items-center justify-between">
      <h3 class="text-base font-semibold leading-130 text-dark line-clamp-2">
        {{ document.title }}
      </h3>
      <a v-if="document.file" :href="document.file" target="_blank">
        <i
          class="icon-download text-2xl text-green transition-300 hover:cursor-pointer hover:text-dark inline-block ml-auto"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.document-card__img {
  box-shadow: 0 2px 24px 0 rgba(164, 164, 164, 0.18);
}
</style>
