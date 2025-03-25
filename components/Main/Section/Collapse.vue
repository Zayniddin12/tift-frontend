<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import type { ILittleCardData } from '~/types/education'

const homeStore = useHomeStore()
const { t } = useI18n()

const purposeLists = computed(() => homeStore.purposeLists)
const selectedCardData = ref<ILittleCardData>({
  type: '',
  description: '',
  image: '',
})
const selectedPurposeCardData = ref<ILittleCardData>({
  type: '',
  description: '',
  image: '',
})
const openActive = ref(null)

function getSelectedData(payload: ILittleCardData, index: number) {
  openActive.value = index
  selectedPurposeCardData.value = {
    type: '',
    description: '',
    image: '',
  }
  if (selectedCardData.value.type === payload.type) {
    selectedCardData.value = {
      type: '',
      description: '',
      image: '',
    }
  } else {
    selectedCardData.value = payload
  }
}

function getSelectedPurposeData(payload: ILittleCardData) {
  selectedCardData.value = {
    type: '',
    description: '',
    image: '',
  }
  if (selectedPurposeCardData.value.type === payload.type) {
    selectedPurposeCardData.value = {
      type: '',
      description: '',
      image: '',
    }
  } else {
    selectedPurposeCardData.value = payload
  }
}

const params = ref({
  page: 1,
})

if (!purposeLists.value.length) {
  Promise.allSettled([homeStore.fetchPurposeList(params.value)])
}
</script>
<template>
  <div class="bg-white pt-7 pb-4 md:pt-7 md:pb-16">
    <div class="container">
      <MainCardPurpose title="our_purpose" class="mb-6">
        <BaseButton
          class="!bg-green z-10 hover:!bg-green-100 hover:!text-white !border !border-white/20 !w-52 !px-[28px] !absolute !bottom-6 capitalize"
          :text="selectedPurposeCardData.type ? t('less') : t('more')"
          variant="green"
          size="large"
          @click="
            getSelectedPurposeData({
              type: $t(`${purposeLists[0].type}`),
              description: purposeLists[0].description,
              image: purposeLists[0].image,
            })
          "
        />
      </MainCardPurpose>
      <CollapseTransition v-if="purposeLists?.length">
        <MainCardCollapseContent
          v-if="selectedPurposeCardData.type"
          :title="$t(`${purposeLists[0].type}`)"
          :content="purposeLists[0].description"
          :image="purposeLists[0].image"
          class="mb-6"
        />
      </CollapseTransition>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-6 gap-2 relative"
      >
        <MainCardLittle
          v-for="(item, idx) in purposeLists?.slice(1)"
          :key="idx"
          :title="$t(`${item.type}`)"
          :data="selectedCardData"
          :active="openActive === idx"
        >
          <BaseButton
            class="!bg-green hover:!bg-green-100 hover:!text-white !border !border-white/20 !w-52 !px-[28px] !absolute !bottom-6 capitalize z-1"
            :text="selectedCardData.type === item.type ? t('less') : t('more')"
            size="large"
            variant="green"
            @click="getSelectedData(item, idx)"
          />
        </MainCardLittle>
      </div>
      <div class="hidden lg:block">
        <CollapseTransition v-if="purposeLists?.length">
          <MainCardCollapseContent
            v-if="selectedCardData.type"
            :title="$t(`${selectedCardData.type}`)"
            :content="selectedCardData.description"
            :image="selectedCardData.image"
          />
        </CollapseTransition>
      </div>
    </div>
  </div>
</template>
