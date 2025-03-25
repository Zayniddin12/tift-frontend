<template>
  <BaseBreadcrumb :routes="breadcrumbRoutes" />
  <ExperienceSectionWrapper
    :title="data?.title"
    active-route="faculties"
    show-ads
    v-bind="{ menu }"
    show-contact
  >
    <div
      v-if="data?.description"
      class="text-base font-normal text-dark"
      v-html="data?.description"
    />
    <div
      class="my-8 shadow-partner-card px-6 py-5 bg-white grid grid-cols-1 w-full md:grid-cols-2 gap-6"
    >
      <FormGroup :label="t('select_faculty')">
        <FormSelect
          v-model="category"
          :placeholder="t('all_academic_areas')"
          class="focus:!border-green"
          v-bind="{ options }"
          label-key="title"
          value-key="slug"
          @update:modelValue="category = $event"
        />
      </FormGroup>
      <FormGroup :label="t('search')">
        <FormInputSearch
          :default-value="params.search"
          class="!bg-gray-4"
          @input="search"
        />
      </FormGroup>
    </div>
    <Transition name="fade" mode="out-in">
      <div :key="loading.list">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-14"
        >
          <ExperienceCardUser
            v-for="(user, idx) in list"
            :key="idx"
            :user="user"
          />
        </div>

        <CommonNoData v-if="!list?.length && !loading.list" class="my-14" />
      </div>
    </Transition>

    <div v-if="loading.list" class="mt-8 flex justify-end">
      <BasePagination
        v-bind="{ currentPage }"
        :total="paginationData.count"
        :limit="params.limit"
        pagination-buttons
        @input="pageChange"
      />
    </div>
  </ExperienceSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { IDefaultResponse, IMenu, IStaticData } from '~/types'
import type { IEducationDirection } from '~/types/education'

interface Props {
  menu: IMenu
}

defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const { updateQuery } = useQueryChange()
const category = ref(route.query.directions__direction__slug)
const options = ref<IEducationDirection[]>([])

const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/faculties',
    name: t('faculty'),
  },
])

const { data } = useAsyncData<IStaticData>('fetchMenu', () =>
  useApi().$get('common/StaticPage/faculty/')
)

watch(
  () => category.value,
  (newValue) => {
    loading.list = true
    params.directions__direction__slug = newValue
    updateQuery('directions__direction__slug', newValue)
  }
)

const search = (e: string) => {
  debounce('search', () => {
    params.search = e.target.value
    updateQuery('search', e.target.value)
  })
}

const getEducationDirections = () => {
  useApi()
    .$get<IDefaultResponse<IEducationDirection>>('education/DirectionList/')
    .then((res) => {
      options.value = res.results
    })
}
getEducationDirections()

const { list, loading, params, paginationData, pageChange, currentPage } =
  useListFetcher('/common/EmployeeList/', 20, {
    directions__direction__slug: category.value,
  })
</script>

<style scoped></style>
