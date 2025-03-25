<script setup lang="ts">
import { downloadFile } from '~/utils'

interface Props {
  title: string
  brochure: string
}

const props = defineProps<Props>()

const downloadBrochure = () => {
  downloadFile(props.brochure, 'brochure')
}
</script>

<template>
  <section
    class="container grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 py-7 md:py-11"
  >
    <div class="col-span-1 md:col-span-3">
      <h1
        class="text-xl md:text-2.5xl text-dark leading-130 font-bold line-clamp-2 mb-3"
      >
        {{ title }}
      </h1>
      <slot name="body" />
    </div>
    <div class="col-span-1">
      <div
        class="bg-white p-5 flex items-center justify-center flex-col space-y-4"
      >
        <NuxtLink to="/apply" class="block w-full">
          <BaseButton size="large" class="w-full">
            <span>
              {{ $t('apply') }}
            </span>
            <i class="icon-file text-lg" />
          </BaseButton>
        </NuxtLink>

        <BaseButton
          variant="secondary-gray"
          size="large"
          class="w-full space-x-1 group"
          @click="downloadBrochure"
        >
          <span>
            {{ $t('download_brochure') }}
          </span>
          <i class="icon-download" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
