<template>
  <nuxt-link
    :to="'/about-us/team/' + id"
    class="relative aspect-square md:aspect-[240/280] z-1 transition-300 transition-all flex flex-col px-5 pb-5 group overflow-hidden"
    :class="{ 'pointer-events-none !px-0 !pb-0': loading }"
  >
    <h1
      class="text-white text-sm md:text-xl leading-130 font-bold mt-auto mb-1 break-words group-hover:text-green transition-300 transition-all"
    >
      {{ fullName }}
    </h1>
    <span class="inline-block w-[100px] h-[2px] mb-2 bg-white/20"></span>
    <p
      class="text-gray-3 text-xs md:text-sm leading-130 font-medium capitalize group-hover:text-white transition-300 transition-all"
    >
      {{ position?.title }}
    </p>
    <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
      <img
        :src="photo"
        :alt="full_name"
        class="absolute w-full h-full object-cover left-0 top-0 -z-2"
      />
    </BaseSkeleton>
    <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
      <span class="card w-full h-full absolute left-0 top-0 -z-1" />
    </BaseSkeleton>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  id: number
  photo: string
  full_name?: string
  position?: {
    title?: string
    slug?: string
  }
  loading?: boolean
}
const fullName = computed(() =>
  props.full_name?.split(' ').slice(0, 2).join(' ')
)
const props = defineProps<Props>()
</script>

<style>
.card {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0) 0%,
    rgba(16, 22, 28, 0.88) 100%
  );
  transition: all 0.3s ease !important;
}
a.group:hover .card {
  cursor: pointer;
}
</style>
