<script setup lang="ts">
import { useHomeStore } from '~/store'
import { useAboutStore } from '~/store/about'

const homeStore = useHomeStore()
const aboutStore = useAboutStore()
const employees = computed(() => homeStore.employeeList)
const documents = computed(() => aboutStore.normativeDocs)
const menu = computed(() => aboutStore.aboutMenuList)
const menuList = computed(() => aboutStore.aboutMenuList?.children)
const aboutRankings = computed(() => aboutStore.aboutRankings)

aboutStore.fetchAboutRankings()

const params = ref({
  page: 1,
})
if (!documents.value) {
  Promise.allSettled([aboutStore.fetchNormativeDocs(params.value)])
}
if (!employees.value) {
  Promise.allSettled([homeStore.fetchEmployeeList(params.value)])
}

if (!menuList.value?.length) {
  Promise.allSettled([aboutStore.fetchSiteMenuDetail()])
}
</script>

<template>
  <div>
    <AboutSectionVision
      v-bind="{ menu: menuList, slug: menu?.slug, activeRoute: 'who-we-are' }"
    />
    <AboutSectionTeam v-if="employees?.length" v-bind="{ employees }" />
    <AboutSectionDocuments
      class="!pt-16"
      v-bind="{ documents: documents?.slice(0, 4) }"
    />
    <AboutSectionFacts v-bind="{ rankings: aboutRankings }" />
    <MainSectionCollapse class="!bg-[#FFFFFF29]" />
    <MainSectionDiscover />
  </div>
</template>

<style scoped></style>
