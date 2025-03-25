<script setup lang="ts">
defineProps<{ data: string }>()
</script>

<template>
  <section class="static-text" v-html="data" />
</template>

<style scoped></style>
