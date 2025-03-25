<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NoData from '~/components/Common/NoData.vue'
import type { IMenu } from '~/types'

interface Props {
  menu: IMenu
  statistics: any[]
}

defineProps<Props>()

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    path: '/education/foundation',
    name: t('foundation'),
  },
])

const { data, error } = useAsyncData(() =>
  useApi().$get(`common/StaticPage/foundation`)
)
if (error.value) {
  showError({ statusCode: 404 })
}
</script>

<template>
  <BaseBreadcrumb :routes="breadcrumbRoutes" />
  <EducationSectionWrapper
    v-if="data"
    :title="data?.title"
    :stats="statistics"
    active-route="foundation"
    v-bind="{ menu: menu?.children, slug: menu?.slug }"
  >
    <EducationCardFoundation :data="data?.description" />
  </EducationSectionWrapper>
  <NoData v-else />
</template>
<style scoped></style>
