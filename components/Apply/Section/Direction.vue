<script setup lang="ts">
import { requiredIf } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { getAreaOfStudy, getLevels } from '~/data/data'
import { useCommonStore } from '~/store/common'
import type {
  IApplyInternational,
  IApplyLocal,
} from '~/types/services/apply.types'

const enum Programmes {
  BACHELORS = 'bachelor-degree',
  MASTERS = 'masters-degree',
  TRANSFER = 'transfer',
}

const props = defineProps<{
  application: IApplyLocal | IApplyInternational
}>()

const { t } = useI18n()
const store = useCommonStore()
const { required } = useTranslate()

const { application } = unref(props)
const { values, $v } = useForm(application, {
  programmes: {
    required,
  },
  direction: {
    requiredIf: requiredIf(() => IsMastersOrBachelors.value),
  },
  area_of_study: {
    requiredIf: requiredIf(() => IsMastersOrBachelors.value),
  },
  level: {
    requiredIf: requiredIf(() => IsTransfer.value),
  },
  transcript_or_academic_reference: {
    requiredIf: requiredIf(() => IsTransfer.value),
  },
})

// fetch
const fetchSelections = async () => {
  await store.getProgrammes()
}

fetchSelections()

const getProgrammesOptions = computed(() => store.programmes)
const IsMastersOrBachelors = computed(() => {
  return (
    values.programmes === Programmes.MASTERS ||
    values.programmes === Programmes.BACHELORS
  )
})
const IsTransfer = computed(() => {
  return values.programmes === Programmes.TRANSFER
})
const getFacultyOptions = computed(() => store.directions)
const isSelectedProgrammes = ref(true)

watch(
  () => application.programmes,
  (newSlug) => {
    const slug = getProgrammesOptions.value.find(
      (item) => item.slug === newSlug
    )?.slug
    isSelectedProgrammes.value = false

    if (slug) {
      store.getDirections(slug, values.area_of_study)
    }
  },
  { deep: true }
)

const directionsBySlug = computed(
  () => store.directionsBySlug?.language_with_id
)

watch(
  () => values.direction,
  (val: string) => {
    store.getDirectionsBySlug(
      getFacultyOptions.value.find((item) => item.id === val)?.slug
    )
  }
)

watch(
  () => values.area_of_study,
  (val: string) => {
    store.getDirections(values.programmes, val)
  }
)

defineExpose({
  values,
  $v,
})
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <FormGroup
      :label="t('programmes')"
      :errors="$v.programmes?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.programmes"
        :error="$v.programmes?.$error"
        :options="getProgrammesOptions"
        label-key="title"
        value-key="slug"
        :placeholder="t('apply_form.placeholders.programmes')"
      />
    </FormGroup>
    <FormGroup
      v-if="IsMastersOrBachelors"
      :label="t('area_of_study')"
      :errors="$v.area_of_study?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.area_of_study"
        :error="$v.area_of_study?.$error"
        :options="getAreaOfStudy()"
        label-key="name"
        value-key="value"
        :placeholder="t('apply_form.placeholders.area')"
      />
    </FormGroup>
    <FormGroup
      v-if="IsMastersOrBachelors"
      :label="t('faculties')"
      :errors="$v.direction?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.direction"
        :error="$v.direction?.$error"
        :options="getFacultyOptions"
        label-key="title"
        value-key="id"
        :disabled="isSelectedProgrammes"
        :placeholder="t('apply_form.placeholders.faculty')"
      />
    </FormGroup>
    <FormGroup
      v-if="IsMastersOrBachelors"
      :label="t('language')"
      :errors="$v.direction_language?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.direction_language"
        :error="$v.direction_language?.$error"
        :options="directionsBySlug"
        label-key="title"
        value-key="id"
        :placeholder="t('apply_form.placeholders.faculty')"
      />
    </FormGroup>
    <FormGroup
      v-if="IsTransfer"
      :label="t('level')"
      :errors="$v.level?.$errors"
      is-required
    >
      <FormSelect
        v-model="values.level"
        :error="$v.level?.$error"
        :options="getLevels()"
        label-key="name"
        value-key="value"
        :placeholder="t('apply_form.placeholders.level')"
      />
    </FormGroup>
    <FormGroup
      v-if="IsTransfer"
      class="col-span-2"
      :label="t('transcript_or_academic_reference')"
      :errors="$v.transcript_or_academic_reference?.$errors"
      is-required
    >
      <FormFileInput
        v-model="values.transcript_or_academic_reference"
        :error="$v.transcript_or_academic_reference?.$error"
        dashed
        :placeholder="
          t('apply_form.placeholders.transcript_or_academic_reference')
        "
      />
    </FormGroup>
  </section>
</template>

<style scoped></style>
