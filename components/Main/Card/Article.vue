<template>
  <RouterLink :to="data?.slug"
    class="relative flex flex-col p-3 md:p-7 bg-white shadow-article-card group duration-500 hover:-translate-y-2 hover:cursor-pointer overflow-hidden"
  >
    <div
      class="w-10 h-10 md:w-[52px] md:h-[52px] flex items-center justify-center mb-3 md:mb-8 p-2.5 bg-green"
    >
      <img class="w-8 h-8 object-contain" :src="data?.icon" alt="" />
    </div>

    <h1
      class="md:mt-8 mb-2 text-xl text-dark font-semibold leading-130 transition-all duration-500 group-hover:text-white"
    >
      {{ $t(data.title) }}
    </h1>
    <p
      class="text-gray-1 text-sm leading-130 transition-all duration-500 group-hover:text-white line-clamp-3 md:line-clamp-2"
    >
      {{ $t(data.subtitle) }}
    </p>

    <div
      class="w-full h-full duration-500 flex-shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 absolute left-0 top-0 bg-dark/60 -z-1"
    >
      <img
        v-lazy="data.image"
        :alt="$t(data.title)"
        class="w-full h-full object-cover object-center absolute left-0 top-0 -z-1"
      />

      <div class="w-full h-full absolute left-0 top-0 bg-dark/60 z-0"></div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
interface Props {
  data: {
    slug?: string
    icon: string
    title: string
    subtitle: string
    image: string
  }
}

defineProps<Props>()
</script>
