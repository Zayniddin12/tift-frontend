<template>
  <div class="bg-gray-5 pb-0">
    <Transition name="fade" mode="out-in">
      <CommonSectionWrapper
        :key="newsLoading"
        :title="newsTitle ? t(newsTitle) : undefined"
        :class="newsWrapperClass"
        :more-button="newsMoreButton"
        more-button-class="!mt-5"
        wrapper-class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 md:mt-10"
        @more="$router.push('/news')"
      >
        <div
          class="order-1 col-span-1 hidden md:col-span-3 md:flex items-center flex-col divide-y divide-gray-3/60"
        >
          <NewsCardSmall
            v-for="(item, index) in newsLoading ? 3 : firstThirdNews"
            :key="index"
            v-bind="{ item, loading: newsLoading }"
          />
        </div>
        <NewsCardLarge
          class="order-3 hidden md:block md:order-2 col-span-2 h-96 md:h-auto md:col-span-6 my-5"
          :item="mainNews"
          v-bind="{ loading: newsLoading }"
        />
        <div
          class="order-2 md:col-span-3 flex items-center flex-col divide-y divide-gray-3/60"
        >
          <NewsCardSmall
            v-for="(item, index) in newsLoading ? 3 : secondThirdNews"
            :key="index"
            v-bind="{ item, loading: newsLoading }"
          />
        </div>

        <NuxtLink
          to="/news"
          class="w-[238px] ml-auto sm:ml-0 order-4"
          :class="{ 'sm:hidden': !isShowingMoreBtn }"
        >
          <BaseButton class="w-full border border-gray-3" variant="secondary">
            {{ $t('all_news') }}
          </BaseButton>
        </NuxtLink>
      </CommonSectionWrapper>
    </Transition>

    <Transition name="fade" mode="out-in">
      <CommonSectionWrapper
        :key="eventsLoading"
        :title="eventsTitle ? t(eventsTitle) : undefined"
        :class="eventsWrapperClass"
        :more-button="eventsMoreButton"
        wrapper-class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:-mb-5 pb-16"
        @more="$router.push('/events')"
      >
        <EventCard
          v-for="(item, index) in eventsLoading ? 4 : events"
          :key="index"
          v-bind="{ item, loading: eventsLoading }"
          class="shadow-partner-card transition-300 hover:cursor-pointer group hover:-translate-y-2"
        />

        <NuxtLink
          to="/events"
          class="w-[238px] ml-auto sm:ml-0 order-4"
          :class="{ 'sm:hidden': !isShowingMoreBtn }"
        >
          <BaseButton class="w-full border border-gray-3" variant="secondary"
            >{{ $t('all_events') }}
          </BaseButton>
        </NuxtLink>
      </CommonSectionWrapper>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useNewsAndEventsStore } from '~/store/news-and-events'
import type { TClassName } from '~/types'

const { t } = useI18n()
const route = useRoute()

interface Props {
  newsTitle?: string
  newsMoreButton?: string
  newsWrapperClass?: TClassName
  eventsTitle?: string
  eventsMoreButton?: string
  eventsWrapperClass?: TClassName
}

withDefaults(defineProps<Props>(), {
  newsTitle: 'news_and_events',
  eventsTitle: '',
})

const store = useNewsAndEventsStore()

const mainNews = computed(() => store.news?.[0])
const firstThirdNews = computed(() => store.news?.slice(1, 4))
const secondThirdNews = computed(() => store.news?.slice(4, 7))
const newsLoading = computed(() => store.newsLoading)
const events = computed(() => store.events)
const eventsLoading = computed(() => store.eventsLoading)
const isShowingMoreBtn = computed(() => route.name === 'news-and-events')

store.fetchNews()
store.fetchEvents()
</script>

<style scoped></style>
