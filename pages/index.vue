<template>
  <div>
    <MainSectionEntrance class="-mt-[201px] z-0" />
    <MainSectionSearch class="relative z-1" />
    <MainSectionAbout />
    <MainSectionFacts :list="statistics" :loading="statisticsLoading" />
    <MainSectionEducation />
    <MainSectionStories />
    <NewsAndEvents events-wrapper-class="!pt-0" />
    <MainSectionCollapse />
    <MainSectionPartners />
    <MainSectionUniversity />
    <MainSectionDiscover />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const loading = ref(false)
const fetchStatistics = async () => {
  loading.value = true
  try {
    await mainStore.fetchStatistics()
  } finally {
    loading.value = false
  }
}

fetchStatistics()

const statistics = computed(() => mainStore.statistics)
const statisticsLoading = computed(() => loading.value)
</script>
