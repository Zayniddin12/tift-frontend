<template>
  <div>
    <EducationSectionFoundation v-bind="{ menu, statistics }" />
  </div>
</template>

<script setup lang="ts">
import { useEducationStore } from '~/store/education'

const educationStore = useEducationStore()
const menu = computed(() => educationStore.menu)

const statistics = ref([])

Promise.allSettled([educationStore.fetchSidebarMenu()])

useApi()
  .$get('common/Statistic/', {
    params: {
      limit: 40,
    },
  })
  .then((res: any) => {
    statistics.value = res?.results
  })
</script>

<style scoped></style>
