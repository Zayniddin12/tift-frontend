<template>
  <div class="bg-white px-4 md:px-6 pb-4 md:pb-6">
    <div>
      <h1 class="text-[#070707] text-xl font-bold leading-relaxed">
        {{ $t('education_program') }}
      </h1>
      <div class="grid grid-cols-3 mt-3 mb-4">
        <div v-for="(item, index) in items" :key="index" class="pr-3 pb-4 mt-4">
          <h2 class="sub">{{ item.name }}</h2>
          <p class="text-[#070707] text-base font-semibold leading-tight">
            {{ item.description }}
          </p>
        </div>
      </div>

      <div
        v-if="status === 'moderation'"
        class="p-5 bg-gray-4 flex justify-between items-center"
      >
        <div class="flex flex-col gap-2">
          <p
            v-if="programs?.exam_date && programs?.exam_type === 'offline'"
            class="text-xl leading-130 font-bold text-[#070707]"
          >
            {{ $t('exam_date') }}:
            {{ dayjs(programs?.exam_date).format('DD.MM.YYYY, HH:mm') }}
          </p>
          <p
            v-if="programs?.exam_type === 'online'"
            class="text-xl leading-130 font-bold text-[#070707]"
          >
            {{ $t('exam_date') }}: {{ programs?.exam_type }}
          </p>
          <p
            v-if="programs?.exam_type === 'preferential'"
            class="text-xl leading-130 font-bold text-[#070707]"
          >
            {{ $t('application_in_moderation') }}
          </p>
          <p class="text-sm leading-130 font-medium text-green">ID {{ id }}</p>
        </div>
        <div
          v-if="programs?.exam_type === 'offline'"
          class="flex-y-center gap-3"
        >
          <i class="icon-clock text-green text-2xl" />
          <div>
            <p class="text-sm leading-130 text-gray-1">
              {{ $t('until_exam') }}
            </p>
            <p class="text-base leading-130 font-semibold text-dark-100">
              {{ $t('days', { day: calculateDays(programs?.exam_date) }) }}
            </p>
          </div>
        </div>
        <a v-else :href="link">
          <BaseButton
            v-if="programs?.exam_type === 'online'"
            :text="$t('go_to_exam')"
          />
        </a>
      </div>
      <div
        v-if="status === 'success'"
        class="p-5 bg-gray-4 md:flex justify-between items-center"
      >
        <div class="flex flex-col gap-2">
          <p class="text-xl leading-130 font-bold text-[#070707]">
            {{ $t('contract') }}:
            {{ $t('course', { course: rumFormat(degree) }) }}
          </p>

          <p class="text-sm leading-130 text-gray-1">
            {{ $t('contract_price') }}:
            <span class="font-semibold text-dark-100"
              >{{ formatNumberSpace(info?.direction_amount) }} UZS</span
            >
          </p>
          <p class="text-sm leading-130 text-gray-1">
            {{ $t('paid_amount') }}:
            <span class="font-semibold text-dark-100"
              >{{ formatNumberSpace(info?.paid_amount) }} UZS</span
            >
          </p>
        </div>
        <div class="grid md:flex-y-center gap-5 mt-5 md:mt-0">
          <BaseButton
            variant="secondary-gray"
            :text="$t('download_contract')"
            icon="icon-download"
            :loading="downloadLoading"
            @click="getUserContract"
          />
          <BaseButton
            icon="icon-wallet"
            :text="$t('online_payment')"
            @click="showPayment = true"
          />
        </div>
      </div>
    </div>
    <ApplyModalPayment :show="showPayment" @close="showPayment = false" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

interface Props {
  programs: any
  degree: number
  id: string | number
  status: string
  link: string
  info: any
}

const props = defineProps<Props>()

const showPayment = ref(false)
const { t } = useI18n()
const items = computed(() => [
  {
    name: t('programmes'),
    description: props?.programs?.program || '-',
  },

  {
    name: t('area_of_study'),
    description: props?.programs?.area_of_study || '-',
  },
  {
    name: t('examination_form'),
    description: props?.programs?.exam_type_display || '-',
  },
])

// function to calculate the difference between two dates
const calculateDays = (date: string) => {
  const currentDate = dayjs()
  const examDate = dayjs(date)
  return examDate.diff(currentDate, 'day')
}

// convert to rum numeric format

const rumFormat = (value: number) => {
  if (value === 1) {
    return 'I'
  } else if (value === 2) {
    return 'II'
  } else if (value === 3) {
    return 'III'
  } else if (value === 4) {
    return 'IV'
  } else {
    return value
  }
}

const downloadLoading = ref(false)

function getUserContract() {
  downloadLoading.value = true
  useApi()
    .$get('users/user-contract/')
    .then((res) => {
      window.open(res?.contract_file, '_blank')
    })
    .finally(() => {
      downloadLoading.value = false
    })
}
</script>

<style scoped lang="postcss">
.sub {
  @apply text-gray-1 text-sm font-normal pb-2 leading-[18.20px];
}
</style>
