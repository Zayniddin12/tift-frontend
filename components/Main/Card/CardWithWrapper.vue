<template>
  <div
    class="border border-borderColor-1 justify-between max-w-[782px] mx-auto"
  >
    <div class="p-5 bg-gray-100 card" v-for="(program, i) in programs" :key="i">
      <h3 class="font-semibold text-xl block mb-2">{{ program?.title }}</h3>
      <p class="text-sm font-normal text-dark leading-5 mb-4">
        {{ program?.description }}
      </p>
      <div class="grid grid-cols-2 gap-6 mb-5">
        <div class="flex-y-center gap-3">
          <i :class="`icon-clock text-2.5xl leading-7 text-gray-1`" />
          <div>
            <p class="text-xs font-normal leading-130 text-gray-1">
              {{ $t('duration') }}
            </p>
            <p
              v-if="program?.period"
              class="text-sm leading-6 text-dark font-bold"
            >
              {{ program?.period }} years
            </p>
          </div>
        </div>

        <div class="flex-y-center gap-3">
          <i :class="`icon-calendar text-2.5xl leading-7 text-gray-1`" />
          <div>
            <p class="text-xs font-normal leading-130 text-gray-1">
              {{ $t('intake') }}
            </p>
            <p
              v-if="program?.period"
              class="text-sm leading-6 text-dark font-bold"
            >
              September
            </p>
          </div>
        </div>

        <div class="flex-y-center gap-3">
          <i :class="`icon-globe text-2.5xl leading-7 text-gray-1`" />
          <div>
            <p class="text-xs font-normal leading-130 text-gray-1">
              {{ $t('language') }}
            </p>
            <p
              v-if="program?.period"
              class="text-sm leading-6 text-dark font-bold"
            >
              English
            </p>
          </div>
        </div>

        <div class="flex-y-center gap-3">
          <i :class="`icon-globe text-2.5xl leading-7 text-gray-1`" />
          <div>
            <p class="text-xs font-normal leading-130 text-gray-1">
              {{ $t('location') }}
            </p>
            <p
              v-if="program?.period"
              class="text-sm leading-6 text-dark font-bold"
            >
              Tashkent
            </p>
          </div>
        </div>
      </div>
      <BaseButton class="self-start" :text="$t('discover_it')" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<Props>()

interface Props {
  programs: any[]
}
</script>

<style scoped>
.card:not(:last-child) {
  border-bottom: 1px solid #e3e4e8;
}
</style>
