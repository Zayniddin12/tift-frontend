<script setup lang="ts">
interface Props {
  image: string
  alt?: string
  title: string
  content: string
}

defineProps<Props>()
</script>
<template>
  <div
    v-if="title"
    class="flex flex-col md:flex-row md:items-center md:space-x-6 pt-5"
  >
    <div :class="title ? 'basis-[40%]' : ''">
      <img
        v-if="image"
        v-lazy="image"
        :alt="title"
        class="w-full aspect-[329/160] object-cover"
      />
    </div>
    <div class="basis-[60%]">
      <div>
        <CommonSectionTitle :title="title" />
      </div>
      <div class="font-normal text-base mt-5" v-html="content" />
    </div>
  </div>
</template>
