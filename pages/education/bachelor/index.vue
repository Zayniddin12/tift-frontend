<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import { useEducationStore } from '~/store/education'

const { t } = useI18n()
const store = useCommonStore()
const educationStore = useEducationStore()
const menu = computed(() => educationStore.menu)
const getDirections = computed(() => store.directions)

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/bachelor',
    name: t('bachelor_degree'),
  },
])

const fetchDirections = async () => {
  await store.getDirections('bachelor-degree')
}

useSeoMeta({
  title: 'TIFT',
})

fetchDirections()

Promise.allSettled([educationStore.fetchSidebarMenu()])
</script>

<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <EducationSectionWrapper
      :title="t('bachelor_degree')"
      has-footer
      active-route="bachelor"
      v-bind="{ menu: menu?.children, slug: menu?.slug }"
    >
      <template #default>
        <section class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <AboutCardCategory
            v-for="(card, idx) in getDirections"
            :key="idx"
            v-bind="card"
            :link="'/education/bachelor/' + card.slug"
          />
        </section>
      </template>
    </EducationSectionWrapper>
  </section>
</template>

<style scoped></style>
