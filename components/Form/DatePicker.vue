<template>
  <div class="c-date-picker relative">
    <VueDatePicker
      v-model="value"
      auto-apply
      :flow="['year', 'month', 'calendar']"
      :month-change-on-scroll="false"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :year-range="yearRange"
      format="dd.MM.yyyy"
      :max-date="new Date()"
      :format-locale="formatLocale"
    >
      <template #dp-input="{ value }">
        <FormInput
          v-bind="{ error }"
          :class="inputClass"
          :model-value="value"
          readonly
          :placeholder="$t('dd_mm_yyyy')"
        >
          <template v-if="!clearIcon" #suffix>
            <Transition name="fade-sm" mode="out-in">
              <i v-if="!value" class="icon-calendar text-xl text-gray-1" />
              <button
                v-else
                class="icon-x-mark text-xl text-gray-1 hover:text-red transition-300"
                @click.stop="emit('update:modelValue', '')"
              ></button>
            </Transition>
          </template>
        </FormInput>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import { enUS, ru, uz } from 'date-fns/locale'
import { useI18n } from 'vue-i18n'

import type { TClassName } from '~/types'

interface Props {
  inputClass?: TClassName
  modelValue: string
  error?: boolean
  clearIcon?: boolean
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()

const { locale } = useI18n()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const yearRange = [new Date().getFullYear() - 50, new Date().getFullYear()]

const formatLocale = computed(() => {
  if (process.client) {
    const locales: IObject = {
      uz,
      ru,
      en: enUS,
    }

    return locales[locale.value]
  }
})
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
</style>
