<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IStudyTableItem } from '~/types/services/education.types'
interface Props {
  title: string
  data: IStudyTableItem[]
}

defineProps<Props>()
const { t } = useI18n()

const getHeader = computed(() => {
  return [
    {
      title: '#',
      key: 'id',
    },
    {
      title: t('education_semester_table.subjects'),
      key: 'title',
    },
    {
      title: t('education_semester_table.professors'),
      key: 'professors',
    },
    {
      title: t('education_semester_table.subject_type'),
      key: 'type',
    },
    {
      title: t('education_semester_table.credits'),
      key: 'credits',
    },
    {
      title: t('education_semester_table.syllabus'),
      key: 'syllabus',
    },
  ]
})

const download = (data: string): void => downloadFile(data, 'syllabus.pdf')
</script>

<template>
  <section>
    <div v-if="data && data.length">
      <h2
        class="text-dark text-base md:text-lg leading-130 font-semibold line-clamp-1 mb-2"
      >
        {{ t('semester', { n: title }) }}
      </h2>
      <hr class="w-[52px] h-0.5 bg-green mb-4" />
      <BaseTable
        :head="getHeader"
        :data="data"
        th-class="text-gray-1 text-sm leading-140 font-medium"
        td-class="capitalize"
        class="mb-6"
      >
        <template #professors="{ data }">
          <ul v-if="data?.professors?.length">
            <li
              v-for="(title, idx) in data.professors"
              :key="idx"
              class="text-green text-sm leading-140 font-medium"
            >
              {{ title?.full_name }}
            </li>
          </ul>

          <p v-else class="normal-case text-sm">{{ $t('no_data') }}</p>
        </template>

        <template #syllabus="{ data }">
          <div class="flex justify-end">
            <BaseButton
              @click="download(data.syllabus)"
              variant="gray"
              size="large"
              class="space-x-1 ml-auto w-[84px] h-[42px]"
            >
              <i class="icon-file text-lg"></i>
              <span class="uppercase text-sm leading-130">{{
                $t('pdf')
              }}</span>
            </BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>

    <CommonNoData v-else />
  </section>
</template>

<style scoped></style>
