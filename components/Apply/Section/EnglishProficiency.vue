<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type {
  IApplyLocal,
  IApplyInternational,
} from '~/types/services/apply.types'
import { useApplyStore } from '~/store/apply'

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()
const { application } = unref(props)
const { international } = useApplyStore()
const { required, maxLength } = useTranslate()

const { values, $v } = useForm(application, {
  highest_qualification: {
    required,
  },
  highest_qualification_name: {
    required,
    maxlength: maxLength(250),
  },
  highest_qualification_region: {
    required,
    maxlength: maxLength(250),
  },
  highest_qualification_district: {
    required,
    maxlength: maxLength(250),
  },
  highest_qualification_start_date: {
    required,
  },
  highest_qualification_end_date: {
    required,
  },
  highest_qualification_diploma: {
    required,
  },
})

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

defineExpose({
  values,
  $v,
})
</script>

<template>
  <div>
    <section class="grid grid-cols-1 pb-6 gap-5 bg-white">
      <FormGroup
        :label="t('highest_qualification')"
        :errors="$v.highest_qualification?.$errors"
        is-required
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
        :errors="$v.highest_qualification_name?.$errors"
        is-required
      >
        <FormInput
          v-model="values.highest_qualification_name"
          :error="$v.highest_qualification_name?.$error"
          :placeholder="t('apply_form.placeholders.name_of_study_place')"
        />
      </FormGroup>
    </section>
    <section class="pb-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
      <FormGroup
        :label="t('region')"
        :errors="$v.highest_qualification_region?.$errors"
        is-required
      >
        <FormInput
          v-model="values.highest_qualification_region"
          :error="$v.highest_qualification_region?.$error"
          :placeholder="t('enter_region')"
          is-required
        />
      </FormGroup>
      <FormGroup
        :label="t('district')"
        :errors="$v.highest_qualification_district?.$errors"
        is-required
      >
        <FormInput
          v-model="values.highest_qualification_district"
          :error="$v.highest_qualification_district?.$error"
          :placeholder="t('apply_form.placeholders.district')"
        />
      </FormGroup>
      <FormGroup
        :label="t('start_date')"
        :errors="$v.highest_qualification_start_date?.$errors"
        is-required
      >
        <FormDatePicker
          v-model="values.highest_qualification_start_date"
          :error="$v.highest_qualification_start_date?.$error"
          :placeholder="t('apply_form.placeholders.start_date')"
        />
      </FormGroup>
      <FormGroup
        :label="t('end_date')"
        :errors="$v.highest_qualification_end_date?.$errors"
        is-required
      >
        <FormDatePicker
          v-model="values.highest_qualification_end_date"
          :error="$v.highest_qualification_end_date?.$error"
          :placeholder="t('apply_form.placeholders.end_date')"
        />
      </FormGroup>
    </section>
    <section class="pb-6 grid grid-cols-1 gap-5 bg-white">
      <FormGroup
        :label="t('high_school_diploma')"
        :errors="$v.highest_qualification_diploma?.$errors"
        is-required
      >
        <FormFileInput
          v-model="values.highest_qualification_diploma"
          :error="$v.highest_qualification_diploma?.$error"
          :placeholder="t('apply_form.placeholders.high_school_diploma')"
        />
      </FormGroup>
    </section>
  </div>
</template>

<style scoped></style>
