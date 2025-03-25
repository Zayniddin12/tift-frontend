<template>
  <AboutSectionWrapper
    :title="t('why_choose')"
    :active-route="'why-choose-tift-university'"
    v-bind="{ menu, slug }"
  >
    <Transition name="fade" mode="out-in">
      <div>
        <div
          v-if="reasons.length && !loading"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AboutCardWhyChoose
            v-for="(item, idx) in reasons"
            :key="idx"
            :data="item"
          />
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseSkeleton
            v-for="i in 6"
            :key="i"
            width="100%"
            height="320px"
            class="border border-slate-200"
            v-bind="{ loading: true }"
          />
        </div>

        <CommonNoData v-if="!reasons.length" class="mt-14" />
      </div>
    </Transition>

    <div class="flex items-center justify-center w-full my-6">
      <BaseButton
        v-if="total > reasons?.length"
        size="large"
        :text="$t('load_more')"
        :loading="buttonLoading"
        @click="loadMore"
      />
    </div>
  </AboutSectionWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types'
import type { IReason } from '~/types/about'

interface Props {
  menu?: IMenu[]
  slug?: string
  total?: number
  reasons: IReason[]
  buttonLoading?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['loadMore'])
const { t } = useI18n()

const count = ref(3)

function loadMore() {
  count.value += 3
  emit('loadMore', count.value)
  console.log(count.value)
}
</script>

<style scoped></style>
