<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
interface Props {
  date: string
  status: 'in_progress' | 'completed' | 'upcoming'
}
const props = defineProps<Props>()

const defineColor = computed(() => {
  switch (props.status) {
    case 'in_progress':
      return 'bg-red'
    case 'completed':
      return 'bg-gray-1'
    case 'upcoming':
      return 'bg-[#F7B73B]'
  }
})
</script>

<template>
  <div v-if="status" class="min-w-[124px]">
    <div
      class="px-3 py-4 bg-[url('/pattern/event-status.svg')] bg-no-repeat bg-cover bg-center border-x border-t border-gray-3 text-center"
    >
      <h3 class="text-2.5xl text-dark font-bold leading-130 mb-0.5">
        {{ dayjs(date).format('DD') }}
      </h3>
      <p class="text-gray-1 font-normal leading-130 text-sm">
        {{ dayjs(date).locale(locale).format('MMMM') }}
      </p>
    </div>
    <div
      class="py-2 text-sm font-medium leading-130 text-white text-center"
      :class="defineColor"
    >
      {{ $t(status) }}
    </div>
  </div>
</template>

<style scoped></style>
