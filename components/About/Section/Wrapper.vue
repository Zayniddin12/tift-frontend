<template>
  <div class="bg-gray-4">
    <CommonSectionWrapper v-bind="{ title }">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="order-2 md:order-1 md:col-span-9">
          <slot></slot>
        </div>
        <div
          class="order-1 md:order-2 md:col-span-3 relative top-0 md:-top-20 space-y-6"
        >
          <CommonSidebar
            v-if="!hasSideBar"
            :title="t('aboutus')"
            v-bind="{ routes: menu, slug, activeRoute }"
          />
          <CommonAds />
          <AboutCardContact v-if="showContact" />
        </div>
      </div>
    </CommonSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'

const { t } = useI18n()

interface Props {
  title: string
  activeRoute?: string
  hasSideBar?: boolean
  showContact?: boolean
  menu?: IMenu[]
  slug?: string
}

defineProps<Props>()
</script>

<style scoped></style>
