<template>
  <div
    class="h-[300px] lg:h-[348px] d-flex flex-col bg-gray-4 p-4 md:p-5 relative overflow-hidden"
  >
    <h1 class="text-base md:text-xl font-bold">"{{ card?.question }}"</h1>
    <span
      class="icon-quote max-w-[28px] max-h-[22px] absolute -left-[3px] top-20 opacity-20"
    ></span>
    <p class="text-sm font-normal mt-4 mb-6 line-clamp-6">{{ card?.answer }}</p>
    <div class="flex items-center justify-start space-x-3 absolute bottom-5">
      <img
        v-lazy="card?.employee?.photo"
        :alt="card?.employee?.full_name ?? 'image'"
        class="shrink-0 w-[52px] h-[52px] object-cover rounded-full border border-gray-3"
      />
      <div>
        <h1 class="text-base font-semibold mb-1">
          {{ card?.employee?.full_name }}
        </h1>
        <p class="text-green text-sm">{{ card?.employee.position.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from '~/types/institute-experience'

interface Props {
  card: IComment
}

defineProps<Props>()
</script>
