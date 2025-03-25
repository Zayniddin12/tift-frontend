<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import type { ISiteMenus } from '~/types/main'

interface Props {
  isTransparent?: boolean
  menus: ISiteMenus[]
}
defineProps<Props>()

const router = useRouter()

const emit = defineEmits<{
  (event: 'hover-child', value: boolean): void
}>()

const showChildren = ref(false)
const activeChild = ref<ISiteMenus | null>()

const hoverChild = (children?: ISiteMenus[]) => {
  showChildren.value = true
  activeChild.value = children
}

const unHoverChild = () => {
  showChildren.value = false
  activeChild.value = null
}
watch(
  () => showChildren.value,
  (val) => {
    emit('hover-child', !val)
  }
)
const goToPage = (url: string) => {
  if (url?.length) router.push(url)
}

const scrollTop = ref(10)

const checkSticky = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  return scrollTop.value > 0
}

window.addEventListener('scroll', () => {
  shouldStick.value = checkSticky()
})
const shouldStick = ref(checkSticky())
</script>

<template>
  <div
    class="transition-300 duration-300 max-xl:hidden pt-7"
    :class="{
      'bg-white': !isTransparent,
      'opacity-0': shouldStick,
      relative: !shouldStick,
    }"
    @mouseleave="unHoverChild"
  >
    <div
      class="container backdrop-blur-lg relative z-11 transition-300 duration-300"
      :class="isTransparent ? 'bg-white/10' : 'bg-gray-4'"
    >
      <div class="px-4 lg:px-16 flex-center-between">
        <button
          v-for="(item, i) in menus"
          :key="i"
          class="text-sm font-medium leading-130 uppercase py-4 transition-300 relative after:absolute after:bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-green hover:after:w-full after:transition-all after:duration-300"
          :class="isTransparent ? 'text-white' : 'text-dark'"
          @mouseenter="hoverChild(item?.children)"
          @click="goToPage(item?.front_url)"
        >
          {{ item?.title }}
        </button>
      </div>
    </div>
    <CollapseTransition v-if="activeChild?.length">
      <div
        v-if="showChildren"
        class="bg-white pt-[70px] pb-6 absolute z-1 left-0 right-0 top-1/2"
        @mouseenter="hoverChild(activeChild)"
      >
        <div class="container grid grid-cols-3 gap-x-6 gap-y-5">
          <div v-for="(item, index) in activeChild" :key="index">
            <button
              class="text-dark text-base font-bold leading-130 cursor-auto transition-300"
              :class="{
                'hover:text-green !cursor-pointer': item?.front_url?.length,
              }"
              @click="goToPage(item?.front_url)"
            >
              {{ item?.title }}
            </button>
            <div class="flex flex-col gap-2 mt-3">
              <NuxtLink
                v-for="(i, idx) in item?.children"
                :key="idx"
                class="text-sm font-medium leading-130 text-gray-1 hover:text-green transition-300"
                :to="i?.front_url"
              >
                {{ i?.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>

<style scoped></style>
