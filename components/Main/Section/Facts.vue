<template>
  <div
    class="relative from-slate-700 to-zinc-900 h-fit py-7 md:py-[52px]"
    style="background: linear-gradient(90deg, #33B34A -140.8%, #10161C 111.6%);"
  >
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 md:gap-x-10 lg:gap-x-20">
        <div class="col-span-2 mb-10 md:col-span-3">
          <CommonSectionTitle
            :title="t('facts_and_numbers')"
            class="text-white text-base font-bold"
          />
        </div>

        <div
          class="md:col-span-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-10 -mt-5 md:mt-0"
        >
          <TeamCardRanking
            v-for="(item, idx) in getData"
            :key="idx"
            v-bind="{ loading, item }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IStatistics } from '~/types/main'

interface Props {
  list?: IStatistics[]
  loading?: boolean
}
const props = defineProps<Props>()

const getData = computed(() => {
  return props.loading ? Array.from({ length: 6 }) : props.list
})

const { t } = useI18n()
</script>
