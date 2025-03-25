<template>
  <div class="w-full flex flex-col gap-5 sm:gap-6">
    <Transition name="fade" mode="out-in">

      <div :key="loading">
        <div
          v-if="data?.description && !loading"
          class="static-text text-sm text-gray-1"
          v-html="data?.description"
        />
        <BaseSkeleton width="100%" height="444px" v-bind="{ loading }" />
      </div>
    </Transition>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { IStaticData } from '~/types'

interface Props {
  data?: IStaticData
  loading?: boolean
}

defineProps<Props>()

const show = ref(false)
</script>

<style lang="css">
.button_player {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
}
</style>
