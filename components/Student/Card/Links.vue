<template>
  <a
    :href="link"
    target="_blank"
    class="bg-white border border-gray-7 p-5 group cursor-pointer"
  >
    <div class="flex justify-between mb-5">
      <img
        v-if="icon"
        v-lazy="icon"
        :alt="`icon of ${title}`"
        class="max-w-12 max-h-12 object-cover"
      />
      <span :class="icon" class="text-green text-5xl" />
      <svg
        class="group-hover:translate-x-[4px] group-hover:-translate-y-[4px] transition-all"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          class="stroke-current text-[#A8ABB3] group-hover:text-green transition-all"
          d="M17 7L7 17"
          stroke="#A8ABB3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="stroke-current text-[#A8ABB3] group-hover:text-green transition-all"
          d="M8 7H17V16"
          stroke="#A8ABB3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <h4 class="text-lg font-semibold">{{ title }}</h4>
  </a>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  link: string
  icon: string
}

defineProps<Props>()
</script>
