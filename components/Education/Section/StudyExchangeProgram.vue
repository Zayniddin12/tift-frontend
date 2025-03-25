<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import Pagination from '~/components/Base/Pagination/Pagination.vue'
import { useListFetcher } from '~/composables/useListFetcher'
import type { IEducationProgram } from '~/types/education'
import type { IStudentStory } from '~/types/student'

const route = useRoute()
const { t } = useI18n()
const { list, loading, currentPage, params, pageChange, paginationData } =
  useListFetcher<IEducationProgram>(
    `education/DirectionExchangeProgramList/?direction__slug/${route.params.slug}`
  )
</script>

<template>
  <CommonSectionWrapper
    class="bg-white py-7 md:py-11"
    :title="t('exchange_programs')"
  >
    <template #default>
      <section>
        <div
          v-if="list?.length"
          class="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <ExchangeCardExchangePrograms
            v-for="(card, idx) in list"
            :key="idx"
            v-bind="card"
          />
          <BasePagination
            v-bind="{ currentPage }"
            :total="paginationData.count"
            :limit="params.limit"
            pagination-buttons
            @input="pageChange"
          />
        </div>
        <CommonNoData v-else class="flex items-center justify-center" />
      </section>
    </template>
  </CommonSectionWrapper>
</template>

<style scoped></style>
