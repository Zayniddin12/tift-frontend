<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'
import type {
  IApplyInternational,
  IApplyLocal,
} from '~/types/services/apply.types'

const props = defineProps<{
  isConfirm: boolean
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()
const commonStore = useCommonStore()
const { required, maxLength, minLength, requiredIf } = useTranslate()

const fetchSelections = async () => {
  await commonStore.getCitizenship()
  await commonStore.getRegion()
}

fetchSelections()

// get selected data
const citizenship = computed(() => commonStore.citizenship)
const educationBackgroundOptions = [
  {
    name: t('secondary_school'),
    value: 'secondary_school',
  },
  {
    name: t('private_school'),
    value: 'private_school',
  },
  {
    name: t('professional_school'),
    value: 'professional_school',
  },
  {
    name: t('academic_lyceum'),
    value: 'academic_lyceum',
  },
]
const gender = computed(() => {
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

const { application } = unref(props)
const { values, $v } = useForm(application, {
  passport_serial_number: {
    required,
    minLength: minLength(9),
  },
  birth_date: {
    required,
  },
  first_name: {
    requiredIf: requiredIf(() => props.isConfirm),
    maxlength: maxLength(250),
  },
  last_name: {
    requiredIf: requiredIf(() => props.isConfirm),
    maxlength: maxLength(250),
  },
  fathers_name: {
    requiredIf: requiredIf(() => props.isConfirm),
    maxlength: maxLength(250),
  },
  citizenship: {
    requiredIf: requiredIf(() => props.isConfirm),
  },
  gender: {
    requiredIf: requiredIf(() => props.isConfirm),
  },
  birth_place: {
    requiredIf: requiredIf(() => props.isConfirm),
  },
  pinfl: {
    requiredIf: requiredIf(() => props.isConfirm),
    minLength: minLength(14),
  },
})
function checkPassport(val) {
  if (val.length === 10) {
    useDebounceFn(() => {
      existPassport(val)
        .then(() => (passportError.value = false))
        .catch(() => (passportError.value = true))
    }, 1000)
  }
}

const passportError = ref(false)
watch(
  () => values.passport_serial_number,
  (newValue) => {
    checkPassport(newValue)
  }
)

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section>
    <div v-if="!isConfirm" class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormGroup
        :label="t('passport_id_serial_number')"
        :errors="$v.passport_serial_number?.$errors"
        is-required
      >
        <FormInput
          v-model="values.passport_serial_number"
          :error="$v.passport_serial_number?.$error"
          maska="AA#######"
          type="text"
          :placeholder="$t('apply_form.placeholders.passport_id_serial_number')"
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
          clear-icon
          :placeholder="t('apply_form.placeholders.birth_date')"
        />
      </FormGroup>
    </div>
    <!--    <ApplyCardExamplePassport class="mt-6" />-->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          :options="gender"
          label-key="name"
          value-key="value"
          :placeholder="t('apply_form.placeholders.gender')"
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
          label-key="name"
          value-key="id"
          :options="citizenship"
          :placeholder="t('apply_form.placeholders.citizenship')"
        />
      </FormGroup>
      <FormGroup
        :label="t('birth_place')"
        is-required
        :errors="$v.birth_place?.$errors"
      >
        <FormInput
          v-model="values.birth_place"
          :error="$v.birth_place?.$error"
          :placeholder="t('apply_form.placeholders.birth_place')"
        />
      </FormGroup>
      <FormGroup
        :label="t('emergency_contact')"
        :errors="$v.emergency_contact?.$errors"
      >
        <FormPhoneNumber
          v-model="values.emergency_contact"
          :error="$v.emergency_contact?.$error"
          placeholder="00 000 00 00"
          is-local
          :maxlength="17"
        />
      </FormGroup>
      <FormGroup
        :label="t('pnfl')"
        :errors="$v.pinfl?.$errors"
        :error="passportError"
        :error-label="$t('validations.passport_exist')"
        is-required
      >
        <FormInput
          v-model="values.pinfl"
          :error="$v.pinfl?.$error || passportError"
          :placeholder="t('apply_form.placeholders.pnfl')"
          maska="###############"
          :maxlength="14"
        />
      </FormGroup>

      <FormGroup
        :label="t('highest_qualification')"
        :errors="$v.highest_qualification?.$errors"
        class="col-span-1 md:col-span-2"
      >
        <FormSelect
          v-model="values.highest_qualification"
          :error="$v.highest_qualification?.$error"
          :options="educationBackgroundOptions"
          label-key="name"
          value-key="value"
          :placeholder="t('apply_form.placeholders.highest_qualification')"
        />
      </FormGroup>
      <FormGroup
        :label="t('name_of_study_place')"
        class="col-span-1 md:col-span-2"
        :errors="$v.highest_qualification_name?.$errors"
      >
        <FormInput
          v-model="values.highest_qualification_name"
          :error="$v.highest_qualification_name?.$error"
          :placeholder="t('apply_form.placeholders.name_of_study_place')"
        />
      </FormGroup>
      <FormGroup
        class="col-span-1 md:col-span-2"
        :label="t('high_school_diploma')"
        :errors="$v.highest_qualification_diploma?.$errors"
      >
        <FormFileInput
          v-model="values.highest_qualification_diploma"
          :error="$v.highest_qualification_diploma?.$error"
          :placeholder="t('apply_form.placeholders.high_school_diploma')"
        />
      </FormGroup>
    </div>
  </section>
</template>

<style scoped></style>
