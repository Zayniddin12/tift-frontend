<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface IDocument {
  id: number
  image: string
  name: string
}
interface Props {
  documents: IDocument[]
  hasLink?: boolean
}
defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <CommonSectionWrapper :title="t('nor_documents')" v-if="documents?.length">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-6 mb-4 md:mb-6"
    >
      <AboutCardDocument
        v-for="(doc, idx) in documents"
        :key="idx"
        :document="doc"
      />
    </div>
    <nuxt-link
      v-if="!hasLink && documents?.length > 4"
      to="/about-us/documents"
      class="inline-flex items-center space-x-1 hover:cursor-pointer group"
    >
      <span
        class="text-dark text-sm leading-130 font-semibold transition-320 group-hover:text-green"
      >
        {{ $t('all_norm_docs') }}</span
      >
      <i
        class="icon-chevron text-dark text-2xl transition-320 group-hover:text-green"
      />
    </nuxt-link>
  </CommonSectionWrapper>
</template>

<style scoped></style>
