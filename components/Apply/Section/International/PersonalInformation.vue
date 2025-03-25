<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useApplyStore } from '~/store/apply'
import { useCommonStore } from '~/store/common'
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
const commonStore = useCommonStore()

const { application } = unref(props)
const { required, validPhoneNumber, email, maxLength, minLength, requiredIf } =
  useTranslate()

const { values, $v } = useForm(application, {
  first_name: {
    required,
    maxlength: maxLength(250),
  },
  last_name: {
    required,
    maxlength: maxLength(250),
  },
  fathers_name: {
    required,
    maxlength: maxLength(250),
  },
  nationality: {
    required,
  },
  citizenship: {
    required,
  },
  region: {
    required,
  },
  gender: {
    required,
  },
  passport_serial_number: {
    required,
    minLength: minLength(10),
  },
  birth_date: {
    required,
  },
  phone_number: {
    required,
    validPhoneNumber,
  },
  emergency_contact: {
    requiredIf: requiredIf(() => values.phone_number.length > 5),
    validPhoneNumber,
  },
  email: {
    required,
    email,
    maxlength: maxLength(250),
  },
})

const fetchSelections = async () => {
  await commonStore.getCitizenship()
  await commonStore.getRegion()
  await commonStore.getCountry()
}

fetchSelections()

const countryOptions = computed(() => commonStore.country)
const regionOptions = computed(() => commonStore.region)
const citizenshipOptions = computed(() => commonStore.citizenship)
const genderOptions = computed(() => {
  return [
    {
      value: 'male',
      name: t('male'),
    },
    {
      value: 'female',
      name: t('female'),
    },
  ]
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
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <FormGroup
      :label="t('first_name')"
      :errors="$v.first_name?.$errors"
      is-required
    >
      <FormInput
        v-model="values.first_name"
        :error="$v.first_name?.$error"
        :placeholder="t('apply_form.placeholders.first_name')"
      />
    </FormGroup>
    <FormGroup
      :label="t('last_name')"
      :errors="$v.last_name?.$errors"
      is-required
    >
      <FormInput
        v-model="values.last_name"
        :error="$v.last_name?.$error"
        :placeholder="t('apply_form.placeholders.last_name')"
      />
    </FormGroup>
    <FormGroup
      :label="t('middle_name')"
      :errors="$v.fathers_name?.$errors"
      is-required
    >
      <FormInput
        v-model="values.fathers_name"
        :error="$v.fathers_name?.$error"
        :placeholder="t('apply_form.placeholders.middle_name')"
      />
    </FormGroup>
    <FormGroup :label="t('gender')" :errors="$v.gender?.$errors" is-required>
      <FormSelect
        v-model="values.gender"
        :error="$v.gender?.$error"
        :options="genderOptions"
        label-key="name"
        value-key="value"
        :placeholder="t('apply_form.placeholders.gender')"
      />
    </FormGroup>
    <FormGroup
      :label="t('nationality')"
      :errors="$v.nationality?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.nationality"
        :error="$v.nationality?.$error"
        :options="countryOptions"
        label-key="name"
        value-key="id"
        :placeholder="t('apply_form.placeholders.nationality')"
      />
    </FormGroup>
    <FormGroup
      :label="t('citizenship')"
      :errors="$v.citizenship?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.citizenship"
        :error="$v.citizenship?.$error"
        :options="citizenshipOptions"
        label-key="name"
        value-key="id"
        :placeholder="t('apply_form.placeholders.citizenship')"
      />
    </FormGroup>
    <FormGroup :label="t('region')" :errors="$v.region?.$errors" is-required>
      <FormSelect
        v-model="values.region"
        :error="$v.region?.$error"
        :options="regionOptions"
        label-key="name"
        value-key="id"
        :placeholder="t('apply_form.placeholders.region')"
      />
    </FormGroup>
    <FormGroup
      :label="t('passport_id_serial_number')"
      :errors="$v.passport_serial_number?.$errors"
      :error="passportError"
      :error-label="$t('validations.passport_exist')"
      is-required
    >
      <FormInput
        v-model="values.passport_serial_number"
        maska="AA #######"
        :error="$v.passport_serial_number?.$error || passportError"
        :placeholder="t('apply_form.placeholders.passport_id_serial_number')"
      />
    </FormGroup>
    <FormGroup
      :label="t('birth_date')"
      :errors="$v.birth_date?.$errors"
      is-required
    >
      <FormDatePicker
        v-model="values.birth_date"
        :error="$v.birth_date?.$error"
        :placeholder="t('apply_form.placeholders.birth_date')"
      />
    </FormGroup>
    <FormGroup
      :label="t('phone_number')"
      :errors="$v.phone_number?.$errors"
      is-required
    >
      <FormPhoneNumber
        v-model="values.phone_number"
        :error="$v.phone_number?.$error"
        placeholder="00 000 00 00"
        :maxlength="17"
      />
    </FormGroup>
    <FormGroup
      :label="t('emergency_contact')"
      :errors="$v.emergency_contact?.$errors"
      is-required
    >
      <FormPhoneNumber
        v-model="values.emergency_contact"
        :error="$v.emergency_contact?.$error"
        placeholder="00 000 00 00"
        is-local
        :maxlength="17"
      />
    </FormGroup>
    <FormGroup :label="t('email')" :errors="$v.email?.$errors" is-required>
      <FormInput
        v-model="values.email"
        :error="$v.email?.$error"
        type="email"
        :placeholder="t('apply_form.placeholders.email')"
      />
    </FormGroup>
  </section>
</template>

<style scoped></style>
