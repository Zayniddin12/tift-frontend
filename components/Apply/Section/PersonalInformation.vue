<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type {
  IApplyInternational,
  IApplyLocal,
} from '~/types/services/apply.types'
import { existPassport } from '~/utils'
import { useTranslate } from '~/utils/i18n-validators'

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()

const { application } = unref(props)
const { required, validPhoneNumber } = useTranslate()

const { values, $v } = useForm(application, {
  phone_number: {
    required,
    validPhoneNumber,
  },
})

const passportError = ref(false)
watch(
  () => values.passport_serial_number,
  (newValue) => {
    if (newValue.length === 10) {
      existPassport(newValue)
        .then(() => (passportError.value = false))
        .catch(() => (passportError.value = true))
    }
  }
)

defineExpose({
  values,
  $v,
  passportError,
})
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-1 gap-5">
    <FormGroup
      :label="t('phone_number')"
      is-required
      :errors="$v.phone_number?.$errors"
    >
      <FormInput
        v-model="values.phone_number"
        :error="$v.phone_number?.$error"
        type="numeric"
        maska="+998 ## ### ## ##"
        placeholder="+998 00 000 00 00"
        :maxlength="17"
      />
    </FormGroup>
  </section>
</template>

<style scoped></style>
