<template>
  <div
    class="transition-300 duration-300"
    :class="{
      ' bg-white  w-full z-50': shouldStick,
      relative: !shouldStick,
      'bg-white': !isTransparent,
      '': route.path !== '/',
    }"
  >
    <div
      :class="buttonPadding ? 'py-4 md:py-7' : ''"
      class="container lg:relative flex items-center justify-between max-lg:items-center pt-3"
    >
      <LayoutHeaderBurger v-model="openMenu" v-bind="{ isTransparent }" />
      <NuxtLink to="/">
        <Transition name="fade-sm" mode="out-in">
          <img
            v-if="!showGreenLogo"
            :key="isTransparent"
            class="h-full w-full min-w-[150px] 2xl:min-w-[193px] object-cover"
            :src="`/images/${
              isTransparent ? 'tift-logo' : 'tift-multicolor'
            }.svg`"
            alt="Logo4"
          />
          <img
            v-else
            :key="isTransparent"
            class="h-full w-full min-w-[150px] 2xl:min-w-[193px] object-cover"
            :src="`/images/tift-multicolor.svg`"
            alt="Logo4"
          />
        </Transition>
      </NuxtLink>
      <div
        v-if="route.path !== '/' || shouldStick"
        class="flex items-center gap-7 max-2xl:gap-2 max-xl:hidden"
      >
        <div
          class="transition-300 max-xl:hidden"
          :class="{ 'bg-white': !isTransparent }"
          @mouseleave="unHoverChild"
        >
          <div class="container z-11 transition-300">
            <div
              class="px-2 lg:px-6 flex-center-between gap-5 max-2xl:gap-3 py-4 md:py-7"
            >
              <button
                v-for="(item, i) in menus"
                :key="i"
                class="2xl:text-sm text-xs font-semibold text-dark leading-130 uppercase py-4 transition-300 relative hover:text-green after:absolute after:bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-green hover:after:w-full after:transition-all after:duration-300"
                @mouseenter="hoverChild(item?.children)"
                @click="goToPage(item?.front_url)"
              >
                {{ item?.title }}
              </button>
            </div>
          </div>

          <CollapseTransition>
            <div
              v-if="showChildren"
              class="bg-white pt-[70px] w-full pb-6 absolute z-1 left-0 right-0 top-[100%]"
              @mouseenter="hoverChild(activeChild)"
            >
              <Transition name="fade-sm" mode="out-in">
                <div :key="activeChild?.length" class="container grid grid-cols-3 gap-x-6 gap-y-5">
                  <div v-for="(item, index) in activeChild" :key="index">
                    <button
                      class="text-dark 2xl:text-base text-xs font-bold leading-130 cursor-auto transition-300"
                      :class="{
                        'hover:text-green !cursor-pointer':
                          item?.front_url?.length,
                      }"
                      @click="goToPage(item?.front_url)"
                    >
                      {{ item?.title }}
                    </button>
                    <div class="flex flex-col gap-2 mt-3">
                      <NuxtLink
                        v-for="(i, idx) in item?.children"
                        :key="idx"
                        class="font-medium leading-130 text-gray-1 hover:text-green transition-300"
                        :to="i?.front_url"
                      >
                        {{ i?.title }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </CollapseTransition>
        </div>
      </div>
      <div
        v-if="!user?.personal_information?.full_name"
        class="flex gap-4 2xl:gap-8 max-md:hidden items-center"
      >
        <div
          v-if="route.path === '/' || shouldStick"
          class="flex flex-col items-end gap-1"
        >
          <p
            class="text-xs font-normal !leading-130 transition-300"
            :class="!shouldStick ? 'text-gray-3' : 'text-gray-1'"
          >
            {{ $t('call_center') }}
          </p>
          <a
            :href="`tel: ${info?.phone_number}`"
            class="font-semibold text-sm 2xl:text-lg !leading-130 transition-300 hover:text-green"
            :class="isTransparent && !shouldStick ? 'text-white' : 'text-dark'"
          >
            {{ formatPhoneNumber(info?.phone_number) }}
          </a>
        </div>
        <BaseButton
          :text="$t('apply')"
          :variant="green"
          class="!px-3 h-max"
          size="large"
          @click="$router.push('/apply')"
        />
      </div>
      <NuxtLink
        v-else
        to="/apply/profile"
        class="flex gap-2.5 max-md:hidden items-center"
      >
        <p
          :class="{ 'text-white': !shouldStick && isTransparent }"
          class="break-words text-[#070707] text-sm leading-130 font-medium text-right hover:text-green transition-300"
        >
          {{ user.personal_information.full_name }}
        </p>
        <div class="w-8 h-8 relative overflow-hidden">
          <img
            v-if="user?.avatar"
            :src="user?.avatar"
            class="w-full h-full object-cover"
            alt="user"
          />
          <img
            v-else
            src="/default-avatar.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </NuxtLink>
      <LayoutHeaderLangSwitcher v-bind="{ isTransparent }" class="md:hidden" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import { useAuthStore } from '~/store/auth'
import type { ISiteMenus } from '~/types/main'

interface Props {
  isTransparent?: boolean
  menus: ISiteMenus[]
  info: {
    phone_number: string
  }
  openMenu?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'open-menu', value: boolean): void
  (event: 'hover-child', value: boolean): void
}>()

const route = useRoute()
const openMenu = ref(props.openMenu ?? false)
watch(
  () => openMenu.value,
  (newValue) => {
    emit('open-menu', newValue)
  }
)

watch(
  () => props.openMenu,
  () => {
    openMenu.value = props.openMenu ?? false
  }
)

const router = useRouter()

const showChildren = ref(false)
const buttonPadding = ref(null)
const activeChild = ref<ISiteMenus | null>()
const showGreenLogo = ref(false)
const showNumber = ref(false)
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
  return scrollTop.value > 10
}
const transparent = ref(false)
window.addEventListener('scroll', () => {
  shouldStick.value = checkSticky()
  transparent.value = true
  showGreenLogo.value = shouldStick.value && transparent.value
  if (shouldStick.value && transparent.value) {
    showNumber.value = true
  } else {
    showNumber.value = false
  }
  if (!shouldStick.value && transparent.value) {
    showChildren.value = false
  }
})
const shouldStick = ref(checkSticky())
buttonPadding.value = shouldStick.value && route.path === '/'

// Auth

const authStore = useAuthStore()
const token = useCookie('access_token')
const user = computed(() => authStore.user)

if (token.value) {
  authStore.getUser()
}
</script>
