<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper
      class="pb-8"
      :title="t('search')"
      :description="t('search_text')"
    />
    <MainSectionSearch class="relative z-1 -mb-24 searchBox" />
    <div class="w-full min-h-[40vh] pt-8 pb-16 bg-white mt-16">
      <div class="max-w-3xl mx-auto w-full">
        <BaseTab
          v-bind="{ list: searchTabs }"
          v-model="tab"
          class="mt-8 mb-10"
          @change="tab = $event"
        />
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="tab" class="max-w-3xl mx-auto">
          <div v-if="tab === 'all'">
            <div v-if="searchList?.programmes?.length" class="mb-6">
              <SearchCard
                :title="t('programmes')"
                link="education"
                tab="programs"
                @change="changeCurrentTab"
              >
                <MainCardWithWrapper
                  v-bind="{ programs: searchList?.programmes }"
                />
              </SearchCard>
            </div>
            <div v-if="searchList?.news?.length" class="mb-6">
              <SearchCard
                :title="t('news')"
                link="news"
                tab="news"
                @change="changeCurrentTab"
              >
                <SearchCardNews
                  v-for="(news, i) in searchList?.news"
                  :key="i"
                  v-bind="{ item: news }"
                />
              </SearchCard>
            </div>
            <div v-if="searchList?.events?.length" class="mb-6">
              <SearchCard
                :title="t('events')"
                link="events"
                tab="events"
                @change="changeCurrentTab"
              >
                <SearchCardEvents
                  v-for="(item, i) in searchList?.events"
                  :key="i"
                  v-bind="{ item }"
                />
              </SearchCard>
            </div>

            <CommonNoData
              v-if="
                !searchList?.news?.length &&
                !searchList?.programmes?.length &&
                !searchList?.events?.length
              "
              class="my-14"
            />
          </div>
          <SearchProgramsList v-if="tab === 'programs'" />

          <SearchNewsList v-if="tab === 'news'" />

          <SearchEventsList v-if="tab === 'events'" />
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'

const homeStore = useHomeStore()
const { t } = useI18n()

const searchList = computed(() => homeStore.searchList)
const tab = ref('all')
const searchTabs = ref([
  {
    title: t('all'),
    slug: 'all',
  },
  {
    title: t('programs'),
    slug: 'programs',
  },
  {
    title: t('news'),
    slug: 'news',
  },
  {
    title: t('events'),
    slug: 'events',
  },
])

const breadcrumbRoutes = computed(() => [
  {
    path: '/search',
    name: t('search'),
  },
])

const changeCurrentTab = (value: string) => {
  console.log('value', value)
  tab.value = value
}
</script>

<style lang="css" scoped>
.searchBox {
  box-shadow: 0px 6.6501px 5.32008px 0px rgba(0, 0, 0, 0.02),
    0px 12.52155px 10.01724px 0px rgba(0, 0, 0, 0.02),
    0px 22.33631px 17.86905px 0px rgba(0, 0, 0, 0.01);
}
</style>
