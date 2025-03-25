<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IAboutRanking } from '~/types/about'

interface Props {
  rankings?: IAboutRanking[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <div class="mt-8">
    <section
      v-if="rankings?.length"
      class="relative md:hidden bg-gradient-to-br from-slate-700 to-zinc-900"
    >
      <CommonSectionWrapper :title="t('rankings')" class="text-white">
        <template #after>
          <div
            class="container grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4"
          >
            <div v-for="(rank, idx) in rankings" :key="idx">
              <TeamCardRanking :item="rank" />
            </div>
          </div>
        </template>
      </CommonSectionWrapper>
    </section>
    <section v-if="rankings?.length" class="hidden md:block">
      <div
        class="relative bg-gradient-to-br from-green-700 to-zinc-900 h-fit pt-[52px] pb-[64px]"
      >
        <div class="container">
          <div class="grid grid-cols-12 gap-x-20">
            <div class="col-span-10 mb-10 md:col-span-2">
              <CommonSectionTitle :title="t('rankings')" class="text-white" />
            </div>
            <div
              class="col-span-12 md:col-span-9 grid grid-cols-3 gap-x-6 gap-y-10"
            >
              <div v-for="(rank, idx) in rankings" :key="idx">
                <TeamCardRanking :item="rank" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
