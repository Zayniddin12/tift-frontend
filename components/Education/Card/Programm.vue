<script setup lang="ts">
import { useEducationStore } from '~/store/education'
import { useRoute } from 'vue-router'

const educationStore = useEducationStore()
const route = useRoute()

//fetch data
const fetchEducationInfo = async () => {
  await educationStore.getEducationInfoBySlug(route.params.slug as string)
}

fetchEducationInfo()

const getEducationInfo = computed(() => educationStore.educationInfo)
</script>

<template>
  <section v-if="getEducationInfo.length" class="py-7 md:py-11 bg-white">
    <div class="container">
      <h1
        class="mb-4 md:mb-6 text-xl md:text-2.5xl leading-130 font-bold text-dark"
      >
        {{$t('program_for')}}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <div v-for="(doc, idx) in getEducationInfo" :key="idx">
          <div class="flex items-center space-x-2 mb-2">
             <img class="w-6 h-6 md:h-7 md:w-7" :src="doc.icon" alt="icon" />
            <h2 class="text-dark ml-[25px] font-semibold text-lg md:text-[22px] truncate">
              {{ doc?.title }}
            </h2>
          </div>
          <div
            class="static-text text-sm leading-140 text-gray-1 font-normal"
            v-html="doc?.body"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
