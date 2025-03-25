<template>
  <div
    class="my-8 card-shadow px-6 py-5 bg-white grid grid-cols-1 w-full md:grid-cols-2 gap-6"
  >
    <FormGroup :label="t('select_faculty')">
      <FormSelect
        v-model="select"
        :placeholder="t('all_academic_areas')"
        class="focus:!border-green"
        v-bind="{ options }"
        label-key="title"
        value-key="slug"
        @update:modelValue="$emit('update-select', $event)"
      />
    </FormGroup>
    <FormGroup :label="t('search')">
      <FormInputSearch class="!bg-gray-4 !h-[46px]" @input="input" />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IDefaultResponse } from '~/types'
import type { IEducationDirection } from '~/types/education'

interface Props {
  select: string
  search?: string
}
defineProps<Props>()
const { t } = useI18n()

const options = ref<IEducationDirection[]>([])

const getEducationDirections = () => {
  useApi()
    .$get<IDefaultResponse<IEducationDirection>>('education/DirectionList/')
    .then((res) => {
      options.value = res.results
    })
}
const emit = defineEmits(['search'])
const input = (e: string) => {
  debounce('search', () => {
    emit('search', e?.target?.value)
  })
}

getEducationDirections()
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
