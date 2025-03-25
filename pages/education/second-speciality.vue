<template>
  <div>
    <EducationSection2ndSpecialty v-bind="{ menu }" />
  </div>
</template>

<script setup lang="ts">
import { useEducationStore } from '~/store/education'

const educationStore = useEducationStore()
const menu = computed(() => educationStore.menu)

Promise.allSettled([educationStore.fetchSidebarMenu()])
</script>

<style scoped></style>
