<template>
  <BaseSkeleton width="100%" height="100px" v-bind="{ loading }">
    <a
      :href="item?.url"
      target="_blank"
      class="flex items-center justify-center px-6 py-5 overflow-hidden bg-white group transition-all transition-300 hover:-translate-y-2 hover:cursor-pointer hover:shadow-partner-card gap-6"
    >
      <img
        v-lazy="item?.logo"
        :alt="item?.title"
        class="max-w-[100px] max-h-[100px] object-contain"
      />
    </a>
  </BaseSkeleton>
</template>

<script setup lang="ts">
import type { IPartner } from '~/types/main'

interface Props {
  item?: IPartner
  loading?: boolean
}

defineProps<Props>()
</script>
