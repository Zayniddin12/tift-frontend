<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useEducationStore } from '~/store/education'
import type { IEducationDirectionDetails } from '~/types/services/education.types'

defineProps<{ education: IEducationDirectionDetails }>()

const { t } = useI18n()
const educationStore = useEducationStore()
const route = useRoute()

// fetch

const fetchFaq = async () => {
  await educationStore.getEducationFaqList(route.params.slug as string)
}

fetchFaq()

const faqLists = computed(() => educationStore.faqList)
</script>

<template>
  <EducationWrapperAbout
    :title="t('about_this_bachelor_degree')"
    :brochure="education?.brochure"
  >
    <template #body>
      <div
        v-if="education?.description"
        class="description text-sm leading-140 text-[#707377] font-normal"
        style="font-family: 'Inter', sans-serif"
        v-html="education?.description"
      />
      <CommonNoData v-else />
    </template>
  </EducationWrapperAbout>
  <EducationCardProgramm />
  <EducationCardGeneralVideo
    v-if="education?.video_url && education?.cover_image"
    :poster="education?.cover_image"
    :link="education?.video_url"
  />
  <TeacherSectionProfile />
  <CommonFaq v-if="faqLists.length" :faq="faqLists" />
</template>

<style scoped></style>
