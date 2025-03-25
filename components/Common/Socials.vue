<script setup lang="ts">
const props = defineProps<{
  iconClass?: string
  instagram_url?: string
  youtube_url?: string
  telegram_url?: string
}>()

const socials = computed(() => [
  {
    social: 'Instagram',
    link: props.instagram_url ?? '',
  },
  {
    social: 'YouTube',
    link: props.youtube_url ?? '',
  },
  {
    social: 'telegram',
    link: props.telegram_url ?? '',
  },
])
</script>

<template>
  <div class="flex-y-center gap-4">
    <a
      v-for="i in socials"
      :key="i?.social"
      :href="i?.link"
      target="_blank"
      :class="`icon-${i?.social?.toLowerCase()} text-2xl leading-6 transition-300 text-white  hover:cursor-pointer hover:text-green ${iconClass}`"
    />
  </div>
</template>

<style scoped></style>
