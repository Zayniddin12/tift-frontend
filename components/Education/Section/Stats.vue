<template>
  <div class="relative wrapper py-[52px] mb:10 md:mb-8">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-20">
        <div class="mb-10 md:col-span-3">
          <CommonSectionTitle
            :title="t('stats_about_foundation')"
            class="text-white"
          />
        </div>
        <div
          class="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10"
        >
          <div v-for="(stat, idx) in stats" :key="idx">
            <EducationCardStat
              :title="stat.title"
              :count="Number(stat?.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  stats: any[]
}

defineProps<Props>()
</script>

<style scoped>
.wrapper {
  background: linear-gradient(114deg, #33b34a -75.53%, #10161c 96.48%);
}
</style>
