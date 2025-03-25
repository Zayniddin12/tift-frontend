<script setup lang="ts">
import { useAboutStore } from '~/store/about'

const aboutStore = useAboutStore()
const documents = computed(() => aboutStore.normativeDocs)

if (!documents.value) {
  aboutStore.fetchNormativeDocs({})
}
useSeoMeta({
  title: documents.value?.title,
  description: richTextPurify(documents.value?.description),
  twitterTitle: documents.value?.title,
  twitterDescription: richTextPurify(documents.value?.description),
  ogTitle: documents.value?.title,
  ogDescription: richTextPurify(documents.value?.description),
})
</script>

<template>
  <AboutSectionDocuments has-link v-bind="{ documents }" />
</template>

<style scoped></style>
