<script setup lang="ts">
defineProps<{ data: string }>()
</script>

<template>
  <section>
    <div class="static-text" v-html="data" />
  </section>
</template>

<style scoped>
.master-card img {
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.master-card strong {
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 24px;
  overflow: hidden;
  color: #10161c;
  text-overflow: ellipsis;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 36.4px */
}
</style>
