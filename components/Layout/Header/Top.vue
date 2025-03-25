<template>
  <collapse-transition>
    <div
      v-if="!shouldStick"
      class="bg-custom-gradient max-lg:hidden hidden-print transition-300 duration-300 w-full"
    >
      <div class="container py-3 flex-center-between">
        <div class="flex-y-center gap-8">
          <nav class="flex-y-center gap-3">
            <NuxtLink
              v-for="(item, index) in menu"
              :key="index"
              :to="item?.front_url"
              :target="validURL(item?.front_url) ? '_blank' : '_self'"
              class="text-white text-xs leading-130 font-medium hover:text-red transition-300"
            >
              {{ item?.title }}
            </NuxtLink>
          </nav>
          <LayoutHeaderLangSwitcher />
        </div>
        <div class="flex-y-center gap-8">
          <p
            class="flex-y-center gap-1 text-xs text-white leading-130 font-normal"
          >
            <i class="icon-map-pin text-white/60 text-xl leading-5" />
            {{ info?.location?.location_name }}
          </p>
          <CommonSocials
            v-bind="info"
            class="group"
            icon-class="group-hover:text-white/40 hover:!text-white"
          />
        </div>
      </div>
    </div>
  </collapse-transition>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import type { ISiteTopMenus } from '~/types/main'
import { validURL } from '~/utils'

interface Props {
  info: {
    id: number
    instagram_url: string
    youtube_url: string
    telegram_url: string
    instagram_icon: string
    youtube_icon: string
    telegram_icon: string
    location: {
      id: number
      location_name: string
    }
    phone_number: string
  }
  menu: ISiteTopMenus[]
}
defineProps<Props>()

const scrollTop = ref(0)

const checkSticky = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  return scrollTop.value > 0
}

window.addEventListener('scroll', () => {
  .value = checkSticky()shouldStick
})
const shouldStick = ref(checkSticky())
</script>
