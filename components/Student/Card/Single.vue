<template>
  <div class="flex items-center flex-col md:flex-row bg-white">
    <img
      v-if="user?.student?.photo"
      v-lazy="user?.student?.photo"
      class="h-full aspect-[278/301] max-w-[278px] object-cover"
      :alt="user?.student?.full_name"
    />
    <div class="p-5 lg:pl-6 lg:pr-8 lg:py-10 md:h-[300px] flex w-full">
      <div>
        <CommonSectionTitle
          :title="user?.student?.full_name"
          class="!text-2xl !font-bold"
        />
        <span class="text-green font-medium leading-5 block mt-4 mb-6">
          {{ user.student?.position }}
        </span>
        <p class="text-sm text-gray-1">{{ user.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStudentStoryDetail } from '~/types/student'

interface Props {
  user: IStudentStoryDetail
}
defineProps<Props>()
</script>

<style scoped></style>
