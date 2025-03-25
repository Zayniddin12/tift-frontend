<script setup lang="ts">
interface Props {
  title: string
  degree?: string | undefined
  image?: string
  slug?: string
  price?: number | string
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative w-full h-full flex flex-col min-h-[212px] p-5 pb-6 transition-all transition-300 group z-0"
    :class="{ 'bg-white': !image }"
  >
    <p
      v-if="degree"
      class="py-1 px-2 mb-3 degree text-xs text-gray-4 font-semibold mt-auto w-max"
    >
      {{ degree }}
    </p>
    <div class="flex flex-col gap-2">
      <p class="font-bold text-white">{{ title }}</p>
      <div v-if="price" class="flex items-center gap-1">
        <span class="icon-cash text-2xl text-gray-3" />
        <p class="text-sm font-semibold text-white">
          {{ formatNumberSpace(+price, 0) }} UZS
        </p>
      </div>
    </div>
    <div v-if="image">
      <img
        v-if="image"
        v-lazy="image"
        :alt="'Image of ' + image"
        class="absolute left-0 top-0 w-full h-full object-cover object-center -z-6"
      />

      <!--    overlay  -->
      <span class="overlay absolute left-0 top-0 w-full h-full -z-[5]" />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background: linear-gradient(
    180deg,
    rgba(16, 21, 28, 0.4) 0%,
    rgba(16, 22, 28, 0.61) 55.73%,
    rgba(16, 22, 28, 0.92) 100%
  );
}

.degree {
  border: 1px solid rgba(213, 215, 219, 0.36);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
}
</style>
