<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
<template>
  <div class="flex relative items-start h-[219px] justify-center">
    <div
      class="absolute bottom-0 left-0 card-bg h-[200px] w-full p-6 z-1 overflow-hidden"
    >
      <h1 class="text-white uppercase font-bold mb-1 text-xl md:text-2.5xl">
        {{ $t(`${title}`) }}
      </h1>
      <div class="w-20 h-1 bg-gray-700"></div>
      <slot></slot>
      <img
        src="/svg/tift-rectangles.svg"
        alt="Patterns"
        class="absolute hidden md:block top-1/2 -translate-y-1/2 right-36 w-[304px]"
      />
    </div>
  </div>
</template>
<style scoped>
.card-bg {
  background-image: url('/images/bg-purpose.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* Mobile Styles */
@media screen and (max-width: 1024px) {
  .card-bg {
    background-position: right;
  }
}
</style>
