<script setup lang="ts">
interface Props {
  idx?: number
  text?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative z-1 mt-[30px]">
    <span class="absolute -top-[60px] font-bold text-[90px] z-0">
      {{ idx }}</span
    >
    <p class="text-dark sm:text-xl font-normal leading-140">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
span {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 117px */
  background: linear-gradient(
    180deg,
    rgba(247, 72, 59, 0.24) 0%,
    rgba(247, 72, 59, 0) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
