<script setup lang="ts">
const route = useRoute()
const breadcrumbRoutes = computed(() => {
  return [
    {
      name: data.value?.title,
      path: `/page/`,
    },
  ]
})

const { data, error } = await useAsyncData(() =>
  useApi().$get(`/common/StaticPage/${route.params?.slug}`)
)

if (error.value) {
  showError({ statusCode: 404 })
}

useSeoMeta({
  title: data.value?.title,
  description: richTextPurify(data.value?.description),
  twitterTitle: data.value?.title,
  twitterDescription: richTextPurify(data.value?.description),
  ogTitle: data.value?.title,
  ogDescription: richTextPurify(data.value?.description),
})
</script>

<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="max-md:container max-w-3xl mx-auto pt-8 pb-6 md:pb-16 px-4">
      <CommonSectionTitle :title="data?.title" class="mb-3" />
      <div class="static-text" v-html="data?.description" v-if="data.description" />
      <CommonNoData v-else class="pt-4"/>
    </div>
  </div>
</template>

<style scoped></style>
