<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/bachelor',
    name: t('bachelor_degree'),
  },
  {
    path: '',
    name: route.params.slug,
  },
])

const currentComponentId = ref(1)
const changeComponent = (id: number) => {
  currentComponentId.value = id
}

const { data, error, pending } = await useAsyncData(() =>
  useApi().$get(`education/DirectionDetail/${route.params?.slug}/`)
)
if (error.value) {
  showError({ statusCode: 404 })
}
const updateSeoMeta = () => {
  useSeoMeta({
    title: data?.value?.title,
    description: data?.value?.subtitle,
    twitterTitle: data?.value?.title,
    twitterDescription: data?.value?.subtitle,
    ogTitle: data?.value?.title,
    ogDescription: data?.value?.subtitle,
    ogImage: data?.value?.background_image ?? data?.value?.cover_image,
    twitterImage: data?.value?.background_image ?? data?.value?.cover_image,
  })
}

// Watch for data changes to update SEO meta tags
watch(data, () => {
  if (data.value) {
    updateSeoMeta()
  }
})
</script>

<template>
  <main class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <BaseLoader v-if="pending" color="##33B34A" />
    <EducationWrapper
      :tab="currentComponentId"
      v-bind="data"
      @change="changeComponent"
    />
    <Transition name="dropdown" mode="out-in" class="transition-300">
      <div :key="currentComponentId" class="transition-300">
        <EducationSectionGeneral
          v-if="currentComponentId === 1 && data"
          :education="data"
        />
        <EducationSectionStudy
          v-else-if="currentComponentId === 2"
          :description="data?.study_plan_description"
        />
        <EducationSectionCooperation />
        <EducationSectionAdmission
          v-if="currentComponentId === 4"
          :description="data?.tuition_fee_description"
          :fee="data?.tuition_fee"
        />
      </div>
    </Transition>
  </main>
</template>
