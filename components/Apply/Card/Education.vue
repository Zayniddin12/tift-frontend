<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useApplyStore } from '~/store/apply'

interface Props {
  exam: {
    id: number
    price: number
    start_date: string
    end_date: string
  }
}

const props = defineProps<Props>()
const { t } = useI18n()
const store = useApplyStore()

const getStartDate = dayjs(props.exam.start_date).format('MMMM DD, YYYY')
const getEndDate = dayjs(props.exam.end_date).format('MMMM DD, YYYY')
const price = formatNumberSpace(props.exam.price)
const active = ref(1)

watch(
  () => active.value,
  (id) => {
    store.local.entrance_exam = id
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <section class="mb-5 last:mb-0">
    <div class="p-4 bg-gray-4 space-x-3 flex">
      <div class="flex-shrink-0">
        <FormRadio
          v-model="active"
          :value="props.exam.id"
          name="activeEntranceExam"
        />
      </div>
      <div>
        <i18n-t
          keypath="entrance_exam_registration"
          tag="h1"
          class="mb-1 text-dark text-base leading-normal font-semibold"
          scope="global"
        >
          <template #time>
            {{ getStartDate }}
          </template>
          <template #price>
            {{ price }}
          </template>
        </i18n-t>
        <i18n-t
          keypath="entrance_exam_registration_time"
          tag="p"
          class="mb-3 text-sm font-normal leading-normal text-gray-1"
          scope="global"
        >
          <template #time>
            {{ getEndDate }}
          </template>
        </i18n-t>

        <div class="px-3 py-[5px] bg-[#11348814] text-green">
          {{ t('entrance_exam_registration_time', { time: getEndDate }) }}
        </div>
      </div>
    </div>
    <div class="p-4 bg-gray-3/30">
      <p class="text-sm leading-normal font-medium text-dark mb-3">
        {{ $t('entrance_exam_title') }}
      </p>
      <ul class="list-decimal pl-4">
        <li class="text-sm leading-normal font-normal text-dark mb-2">
          {{ $t('entrance_exam_condition_one') }}
        </li>
        <li class="text-sm leading-normal font-normal text-dark">
          {{ $t('entrance_exam_condition_two') }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
