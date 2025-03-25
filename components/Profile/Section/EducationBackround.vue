<template>
  <div class="bg-white px-4 md:px-6">
    <div>
      <h1 class="text-[#070707] text-xl font-bold leading-relaxed">
        {{ $t('education_background') }}
      </h1>
      <div class="grid grid-cols-3 mt-3 pb-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="border-b border-b-gray-6 pr-3 pb-4 mt-4"
        >
          <h2 class="sub">{{ item?.name }}</h2>
          <p class="text-[#070707] text-base font-semibold leading-tight">
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  background: any
}

const props = defineProps<Props>()

const { t } = useI18n()
const items = computed(() => [
  {
    name: t('highest_qualification'),
    description: props?.background?.highest_qualification || '-',
  },

  {
    name: t('name_of_study_place'),
    description: props?.background?.highest_qualification_name || '-',
  },
  {},
])
</script>

<style scoped lang="postcss">
.sub {
  @apply text-gray-1 text-sm font-normal pb-2 leading-[18.20px];
}
</style>
