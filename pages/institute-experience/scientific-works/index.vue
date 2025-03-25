<template>
  <div class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <ExperienceSectionWrapper
      :title="$t('scientific_works')"
      active-route="scientific-works"
      show-ads
      v-bind="{ menu }"
    >
      <div
        class="bg-white px-6 py-5 flex flex-col md:flex-row gap-5 mb-4 md:mb-8"
      >
        <FormGroup class="w-full" :label="$t('select_category')">
          <FormSelect
            v-model="category"
            :placeholder="$t('all_academic_areas')"
            :options="categories"
            :loading="categoriesLoading"
            label-key="title"
            value-key="slug"
          />
        </FormGroup>
        <FormGroup class="w-full" :label="$t('search')">
          <FormInputSearch
            :default-value="params.search"
            class="!bg-gray-4 !max-w-full"
            @search="params.search = $event"
          />
        </FormGroup>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="loading.list || list?.length"
          :key="loading.list"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <NewsCard
            v-for="(item, index) in loading.list ? 9 : list"
            v-bind="{ item, loading: loading.list }"
            :key="index"
            link="institute-experience/scientific-works"
            class="h-full"
            is-work
          />
        </div>
        <CommonNoData v-else />
      </transition>
      <div class="mt-8 flex justify-end">
        <BasePagination
          v-bind="{ currentPage }"
          :total="paginationData.count"
          :limit="params.limit"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </ExperienceSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useInstituteStore } from '~/store/institute-experience'
import { useScientificWorks } from '~/store/scientific-works'

const scientificStore = useScientificWorks()
const institutionStore = useInstituteStore()
const menu = computed(() => institutionStore.menu)

const { t } = useI18n()
const route = useRoute()
const { updateQuery } = useQueryChange()

const categories = computed(() => scientificStore.categories)
const categoriesLoading = computed(() => scientificStore.categoriesLoading)
const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/scientific-works',
    name: t('scientific_works'),
  },
])

const category = ref(route.query.category__slug)

const { list, loading, params, paginationData, pageChange, currentPage } =
  useListFetcher('/institute-experience/ScientificWorkList/', 9, {
    category__slug: category.value,
  })

watch(
  () => category.value,
  (newValue) => {
    loading.list = true
    params.category__slug = newValue
    updateQuery('category__slug', newValue)
  }
)

scientificStore.fetchCategories()

Promise.allSettled([institutionStore.fetchMenu()])
</script>
