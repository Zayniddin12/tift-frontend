<template>
  <div class="bg-white p-4 md:p-6">
    <div>
      <h1 class="text-[#070707] text-xl font-bold leading-relaxed">
        {{ $t('personal_informations') }}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 mt-3">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="border-b border-b-gray-6 pr-3 pb-4 mt-4"
        >
          <h2 class="sub">{{ item?.name }}</h2>
          <p class="text-[#070707] text-base font-semibold leading-tight">
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IContact } from '~/types/contact/contact.types'

interface Props {
  personalInfo?: IContact
  status?: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const items = computed(() => [
  {
    name: t('phone_number'),
    description: props?.personalInfo?.phone || '-',
  },

  {
    name: t('passport_series'),
    description: props?.personalInfo?.passport || '-',
  },
  {
    name: t('date_of_birth'),
    description: props?.personalInfo?.birth_date || '-',
  },
  {
    name: t('full_name'),
    description: props?.personalInfo?.full_name || '-',
  },
  {
    name: t('pnfl'),
    description: props?.personalInfo?.pinfl || '-',
  },
  {
    name: t('gender'),
    description: props?.personalInfo?.gender || '-',
  },
  {
    name: t('citizenship'),
    description: props?.personalInfo?.citizenship || '-',
  },
  {
    name: t('additional_phone_number'),
    description: props?.personalInfo?.additional_phone
      ? formatPhoneNumber(props?.personalInfo?.additional_phone)
      : '-',
  },
  {},
])
</script>

<style scoped lang="postcss">
.sub {
  @apply text-gray-1 text-sm font-normal pb-2 leading-[18.20px];
}
</style>
