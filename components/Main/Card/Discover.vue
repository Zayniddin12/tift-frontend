<template>
  <NuxtLink
    :to="item?.link"
    class="md:px-3 max-md:py-3 cursor-pointer text-dark hover:text-green-200 transition-all duration-300 ease-in-out flex flex-col justify-between gap-3 md:gap-4 max-md:border-b md:border-r border-gray-3"
  >
    <div>
      <h1 class="font-semibold text-base md:text-2xl leading-6">
        {{ $t(item?.title) }}
      </h1>
      <p class="text-sm md:text-base font-normal mt-2 line-clamp-2 opacity-50">
        {{ $t(item?.description) }}
      </p>
    </div>
    <button
      class="text-green transition-all duration-300 ease-in-out flex items-center"
    >
      <span>{{ $t(item?.btnText) }}</span>
      <span class="icon-chevron text-xl md:text-2xl ml-1"></span>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  item: {
    title: string
    description: string
    btnText: string
    link: string
  }
}

defineProps<Props>()
</script>
