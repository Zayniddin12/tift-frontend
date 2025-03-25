<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useHomeStore } from '~/store'
import type { ISearch } from '~/types'

const homeStore = useHomeStore()

const isSearchOpen = ref(false)
const route = useRoute()
const search = ref(route.query.q || '')
const searchList = ref<ISearch[]>([])
const { name } = route
const { updateQuery } = useQueryChange()
const router = useRouter()

const searchFn = (search: string) => {
  useApi()
    .$get<ISearch[]>(`/common/SearchSuggestionList/?q=${search}`)
    .then((res) => (searchList.value = res))
}

if (search.value) homeStore.fetchSearchList(String(search.value))

const redirectToSearch = () => {
  router.push({
    name: 'search',
    query: {
      q: search.value,
    },
  })
}

watch(
  () => search.value,
  (search) => {
    if (route.name === 'search') {
      isSearchOpen.value = false
      router.push({
        name: 'search',
        query: {
          q: search,
        },
      })
      debounce('search', () => {
        homeStore.fetchSearchList(String(search))
        updateQuery('q', String(search))
      })
    } else {
      debounce('search', () => {
        searchFn(String(search))
      })
    }
  }
)

const goToLink = (type: string, slug: string) => {
  return type?.toLowerCase() === 'direction'
    ? `/education/bachelor/${slug}`
    : `/${type}/${slug}`
}
</script>

<template>
  <div class="max-w-3xl mx-auto !box-content -mt-[37px] relative">
    <div
      class="entrance-pagination absolute z-0 bottom-full left-4 right-4 -translate-y-4 flex gap-3"
    />
    <FormInputSearchLarge
      class="relative z-1"
      v-model="search"
      :placeholder="$t('search')"
      @focusin="isSearchOpen = true"
      @focusout="isSearchOpen = false"
      @search="$router.push(`/search?q=${search}`)"
    />
    <transition name="result">
      <div
        v-if="isSearchOpen && name !== 'search' && search.length > 0"
        class="absolute z-20 left-4 right-4 top-full bg-white search-result border border-gray-7 flex flex-col translate-y-2"
      >
        <template v-if="searchList?.length">
          <NuxtLink
            v-for="(search, i) in searchList?.slice(0, 5)"
            :key="i"
            :to="goToLink(search.type, search.slug)"
            class="pl-5 bg-white hover:bg-gray-4 transition-300"
          >
            <span
              class="flex-center-between border-b border-gray-7 pr-4 md:pr-5 py-2 md:py-4"
              :class="{ 'border-none': i === 5 }"
            >
              <span
                class="text-dark text-sm md:text-base font-medium leading-130 md:leading-140"
              >
                {{ search.title }}
              </span>
              <span
                class="text-gray-2 font-medium capitalize text-sm md:text-base leading-140"
              >
                {{ search?.type }}
              </span>
            </span>
          </NuxtLink>
          <NuxtLink
            v-if="searchList?.length >= 5"
            :to="`/search?q=${search}`"
            class="flex-y-center gap-1 text-sm font-medium leading-140 text-gray-1 py-2 md:py-3 px-5 border-t border-gray-7 hover:bg-gray-4 transition-300 group hover:text-green"
          >
            {{ $t('see_all_results') }}
            <i
              class="icon-chevron text-gray-2 text-xl leading-5 group-hover:text-green group-hover:translate-x-0.5 transition-300"
            />
          </NuxtLink>
        </template>
        <div
          v-if="search && !searchList?.length"
          class="text-center px-4 pt-14 pb-[72px] max-w-sm mx-auto"
        >
          <i class="text-gray-2 text-[80px] -[80px] icon-search" />
          <h2 class="text-2xl font-semibold leading-130 text-dark mb-2 mt-7">
            {{ $t('no_results_found') }}
          </h2>
          <p class="text-gray-1 leading-140 text-base font-normal">
            {{ $t('no_information_found_for_the_request_please_try_again') }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.search-result {
  box-shadow: 0 2.76726px 2.21381px 0 rgba(0, 0, 0, 0.03),
    0 6.6501px 5.32008px 0 rgba(0, 0, 0, 0.02),
    0 12.52155px 10.01724px 0 rgba(0, 0, 0, 0.02),
    0 22.33631px 17.86905px 0 rgba(0, 0, 0, 0.01),
    0 41.77761px 33.42209px 0 rgba(0, 0, 0, 0.01),
    0 100px 80px 0 rgba(0, 0, 0, 0.01);
}

@keyframes result {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(8px);
  }
}

.result-enter-active {
  animation: result 0.3s ease-in-out;
}
.result-leave-active {
  animation: result 0.3s ease-in-out reverse;
}
</style>
