<script setup lang="ts">
import type { IMenu } from '~/types'

interface Props {
  title: string
  routes?: IMenu[]
  activeRoute?: string
  slug: string
}

const props = defineProps<Props>()

const loading = ref(false)
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <BaseSkeleton width="100%" height="380px" v-bind="{ loading }" />
        <div v-if="routes?.length && !loading">
          <h2
            class="flex-y-center gap-3 p-4 text-sm font-medium leading-130 uppercase text-white bg-green"
          >
            <img src="/svg/logo/colorfullnew.svg" alt="" />
            {{ title }}
          </h2>
          <NuxtLink
            v-for="(item, index) in routes"
            :key="index"
            :to="
              item?.slug === 'who-we-are' || item?.slug === 'foundation-year'
                ? `/${slug}`
                : item?.front_url
            "
            class="w-full relative flex-y-center gap-3 py-[18px] px-5 text-sm font-semibold leading-130 text-dark bg-white hover:text-green transition-300 hover:border-l-green"
          >
            <svg
              v-if="activeRoute === item?.slug"
              class="absolute left-0"
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="54"
              viewBox="0 0 19 54"
              fill="none"
            >
              <rect
                width="19"
                height="54"
                fill="url(#paint0_linear_2223_4927)"
              />
              <rect width="3" height="54" fill="#33B34A" />
              <defs>
                <linearGradient
                  id="paint0_linear_2223_4927"
                  x1="-71.5"
                  y1="27"
                  x2="19"
                  y2="27"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#33B34A" />
                  <stop
                    offset="0.985107"
                    stop-color="#33B34A"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
            {{ $t(item?.title) }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.shadow-sidebar {
}
</style>
