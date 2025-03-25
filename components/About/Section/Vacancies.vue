<template>
  <AboutSectionWrapper
    :title="t('vacancies')"
    :active-route="'vacancies'"
    v-bind="{ menu, slug }"
  >
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseSkeleton
            v-for="i in 10"
            :key="i"
            width="100%"
            height="124px"
            v-bind="{ loading }"
          />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutCardVacancy
            v-for="(item, idx) in vacancies"
            :key="idx"
            :data="item"
          />
        </div>
        <CommonNoData v-if="!loading && !vacancies.length" class="mt-14" />
      </div>
    </Transition>

    <div class="flex items-center justify-center w-full my-6">
      <BaseButton
        v-if="vacancies?.length < total"
        size="large"
        :text="$t('load_more')"
        @click="loadMore"
      />
    </div>
  </AboutSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'
import type { IVacancy } from '~/types/about'

const count = ref(0)

interface Props {
  menu?: IMenu[]
  slug?: string
  vacancies: IVacancy[]
  total: number
  loading?: boolean
}
const emit = defineEmits(['loadMore'])
const props = defineProps<Props>()

function loadMore() {
  count.value += props.vacancies.length
  emit('loadMore', count.value)
}

const { t } = useI18n()
</script>

<style scoped></style>
