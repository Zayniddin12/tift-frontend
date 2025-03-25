<script setup lang="ts">
import type { IStudentStory } from '~/types/student'

interface Props {
  item?: IStudentStory
  loading?: boolean
}
defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/for-students/talent-and-career/${item?.slug || 'ad'}`"
    class="w-full aspect-[6/7] story-card relative group cursor-pointer p-5 flex items-end bg-gray-4"
    :style="
      !loading && item?.student?.photo
        ? `background-image: url('${item?.student?.photo}')`
        : undefined
    "
    :class="{ 'pointer-events-none': loading }"
  >
    <div
      v-if="!loading"
      class="relative z-1 group-hover:opacity-0 transition-300"
    >
      <h4
        class="text-white text-sm font-bold leading-130 pb-1.5 relative after:absolute after:top-full after:h-0.5 after:w-[100px] after:bg-white/20 after:left-0"
      >
        {{ item?.student?.full_name }}
      </h4>
    </div>
    <div
      v-if="!loading"
      class="absolute z-0 inset-0 bg-green/80 p-5 flex flex-col justify-between scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-300"
    >
      <div>
        <h4
          class="text-white text-sm font-bold leading-130 pb-1.5 relative after:absolute after:top-full after:h-0.5 after:w-[100px] after:bg-white/20 after:left-0"
        >
          {{ item?.student?.full_name }}
        </h4>
        <p class="text-white text-sm font-medium leading-130 mt-7">
          {{ item?.title }}
        </p>
      </div>
      <div
        class="flex-y-center gap-0.5 text-xs leading-130 text-white font-bold"
      >
        {{ $t('see_the_story') }}
        <i class="icon-chevron text-white text-base leading-4" />
      </div>
    </div>
    <span
      v-if="!loading"
      class="overlay-dark absolute inset-0 z-0 pointer-events-none group-hover:opacity-0 transition-300"
    />
  </NuxtLink>
</template>

<style scoped>
.story-card {
  background: center center no-repeat;
  background-size: cover;
}
.overlay-dark {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0) 0%,
    rgba(16, 22, 28, 0.88) 100%
  );
}
</style>
