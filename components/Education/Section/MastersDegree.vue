<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'

interface Props {
  menu: IMenu
}

defineProps<Props>()
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/masters-degree',
    name: t('masters_degree'),
  },
])

const { data, error } = useAsyncData(() =>
  useApi().$get(
    `education/DirectionList/?education_type__slug=bachelor-degree`,
    { params: { education_type__slug: 'masters-degree', offset: 0, limit: 50 } }
  )
)

if (error.value) {
  showError({ statusCode: 404 })
}
</script>

<template>
  <BaseBreadcrumb :routes="breadcrumbRoutes" />
  <EducationSectionWrapper
    :title="$t('masters_degree')"
    active-route="masters-degree"
    v-bind="{ menu: menu?.children, slug: menu?.slug }"
  >
    <template #default>
      <section class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <AboutCardCategory
          v-for="(card, idx) in data?.results"
          :key="idx"
          v-bind="card"
          :link="'/education/bachelor/' + card.slug"
        />
      </section>
    </template>
  </EducationSectionWrapper>
</template>
<style scoped></style>
