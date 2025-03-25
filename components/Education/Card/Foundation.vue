<script setup lang="ts">
interface Props {
  data: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="static-text">
    <div v-html="data" />
  </section>
</template>

<style scoped></style>
