<template>
  <div class="mb-10">
    <ExperienceSectionFaculty v-bind="{ menu }" />
  </div>
</template>

<script setup lang="ts">
import { useInstituteStore } from '~/store/institute-experience'

const institutionStore = useInstituteStore()
const menu = computed(() => institutionStore.menu)

Promise.allSettled([institutionStore.fetchMenu()])
</script>

<style scoped></style>
