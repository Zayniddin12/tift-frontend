<template>
  <div class="bg-white">
    <CommonSectionWrapper
      :title="t('one_university_two_cities')"
      :description="t('university_description')"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
        <MainCardVideo
          v-for="(item, idx) in loading ? 2 : list"
          :key="idx"
          v-bind="{ item, loading }"
        />
      </div>
    </CommonSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMainStore } from '~/store/main'

const { t } = useI18n()
const store = useMainStore()

const list = computed(() => store.branchList)
const loading = computed(() => store.branchListLoading)
store.fetchBranchList()
</script>
