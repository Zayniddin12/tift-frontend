<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useApplyStore } from '~/store/apply'
import { useCommonStore } from '~/store/common'
import type {
  IApplyInternational,
  IApplyLocal,
} from '~/types/services/apply.types'

const enum ExamType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  PREFERENTIAL = 'preferential',
}

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
  isInternational?: boolean
}>()

const { application } = unref(props)
const { t } = useI18n()
const applyStore = useApplyStore()
const common = useCommonStore()
const { required, requiredIf } = useTranslate()

const isOffline = ref(false)
const isOnline = ref(false)
const isPreferential = ref(false)

const { values, $v } = useForm(application, {
  exam_type: {
    required,
  },
  reason: {
    requiredIf: requiredIf(() => isPreferential.value),
  },
  reason_file: {
    requiredIf: requiredIf(() => isPreferential.value),
  },
  exam_date: {
    requiredIf: requiredIf(() => isOffline.value),
  },
})

const examForm = computed(() => {
  return [
    {
      value: ExamType.PREFERENTIAL,
      name: t('preferential_admission'),
    },
    {
      value: ExamType.OFFLINE,
      name: t('offline_exam'),
    },
    {
      value: ExamType.ONLINE,
      name: t('online_exam'),
    },
  ]
})

watch(
  () => values.exam_type,
  (newValue) => {
    isOffline.value = newValue === ExamType.OFFLINE
    isOnline.value = newValue === ExamType.ONLINE
    isPreferential.value = newValue === ExamType.PREFERENTIAL
  }
)

const getEntranceExamsOptions = computed(() => {
  return applyStore.entranceExams.map((date) => {
    return {
      name: dayjs(date.time).format('DD.MM.YYYY, HH:mm'),
      value: date.id,
    }
  })
})
const getReasonsList = computed(() => common.reasonsList)

// fetch data

const fetchSelections = async () => {
  await applyStore.getEntranceExams()
  await common.getReasonsList()
}

fetchSelections()

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section>
    <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
      <FormGroup
        :label="t('examination_form')"
        :errors="$v.exam_type?.$errors"
        is-required
      >
        <FormSelect
          v-model="values.exam_type"
          :error="$v.exam_type?.$error"
          :options="examForm"
          label-key="name"
          value-key="value"
          :placeholder="t('apply_form.placeholders.examination_form')"
        />
      </FormGroup>
      <FormGroup
        v-if="isPreferential"
        :errors="$v.reason?.$errors"
        :label="$t('reason')"
      >
        <FormSelect
          v-model="values.reason"
          :error="$v.reason?.$error"
          label-key="name"
          value-key="id"
          :options="getReasonsList"
          :placeholder="$t('reason_placeholder')"
        />
      </FormGroup>
      <FormGroup
        v-if="isOffline"
        :errors="$v.exam_date?.$errors"
        :label="$t('date_of_exam')"
        is-required
      >
        <FormSelect
          v-model="values.exam_date"
          :options="getEntranceExamsOptions"
          :error="$v.exam_date?.$error"
          label-key="name"
          value-key="value"
          :placeholder="$t('reason_placeholder')"
        />
      </FormGroup>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormGroup
        v-if="isPreferential"
        class="col-span-2"
        :errors="$v.reason_file?.$errors"
        is-required
        :label="$t('reasons_doc')"
      >
        <FormFileInput
          v-model="values.reason_file"
          dashed
          class="!border-dashed"
          :error="$v.reason_file?.$error"
        />
      </FormGroup>
      <div v-if="isOnline" class="flex items-center px-4 py-2 gap-3 bg-gray-4">
        <div>
          <i class="icon-alert text-center text-[28px] text-[#FFA800]" />
        </div>
        <div class="text-sm font-semibold leading-tight">
          {{ $t('go_to_profile') }}
        </div>
      </div>
    </div>
  </section>
</template>
