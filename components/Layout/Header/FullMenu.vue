<template>
  <div
    class="bg-white fixed z-49 left-0 h-max top-[86px] w-full py-4 overflow-y-auto flex flex-col justify-between hidden-print"
  >
    <div>
      <div
        v-if="!user?.personal_information?.full_name"
        class="px-4 relative z-0"
      >
        <p class="text-gray-1 text-xs leading-130 font-normal mb-1">
          {{ $t('call_center') }}
        </p>
        <a
          :href="`tel: ${info?.phone_number}`"
          class="text-dark font-semibold text-lg leading-130"
        >
          {{ formatPhoneNumber(info?.phone_number) }}
        </a>
        <BaseButton
          class="block w-full mt-4"
          :text="$t('apply')"
          size="large"
          @click="$router.push('/apply')"
        />
      </div>
      <NuxtLink
        v-else
        to="/apply/profile"
        class="flex gap-2.5 md:hidden items-center ml-4"
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
      <div class="flex flex-col my-7 relative z-0">
        <div v-for="(item, index) in menus" :key="index" class="pl-4 group">
          <div
            class="py-4 pr-4 flex-center-between border-b border-gray-3 group-first:pt-0 group-last:pb-0 group-last:border-b-0"
            @click="openChild(item)"
          >
            <h4
              class="w-full text-lg font-bold leading-130 text-dark"
              @click="openContact(item.front_url)"
            >
              {{ item?.title }}
            </h4>
            <i
              class="icon-chevron text-gray-1 text-2xl leading-6 rotate-90 shrink-0 transition-300"
              :class="{
                '!-rotate-90 !text-green':
                  activeChild === item?.id && item?.children,
              }"
            />
          </div>
          <CollapseTransition v-if="item?.children">
            <div
              v-if="activeChild === item?.id"
              class="pt-4 flex flex-col gap-4"
            >
              <div
                v-for="(extraItem, extraIdx) in item?.children"
                :key="extraIdx"
                class="pl-2 pr-4 pb-1 flex-center-between"
                @click="openExtraChild(extraItem)"
              >
                <h4 class="text-base font-medium text-dark leading-130">
                  {{ extraItem?.title }}
                </h4>
                <i class="icon-chevron text-2xl leading-6 text-gray-1" />
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>
      <div class="flex flex-col gap-4 px-4 mb-5">
        <NuxtLink
          v-for="(item, i) in menu"
          :key="i"
          :to="item?.front_url"
          :target="item?.target"
          class="text-sm leading-130 font-medium text-dark"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
    <div class="px-4">
      <a
        href=""
        class="inline-flex items-center gap-1 text-sm leading-130 font-normal text-gray-1"
      >
        <i class="icon-map-pin text-2xl leading-6 text-gray-2/60" />
        {{ info?.location?.location_name }}
      </a>
      <div class="mt-4">
        <h5 class="text-sm font-normal leading-130 text-gray-2 mb-3">
          {{ $t('follow_us_on_social_networks') }}
        </h5>
        <CommonSocials
          v-bind="info"
          class="!gap-6"
          icon-class="!text-green !text-2.5xl !leading-7"
        />
      </div>
    </div>
    <transition name="menu">
      <div
        v-if="activeExtraChild"
        class="absolute inset-0 bg-white z-1 p-4 h-full w-full overflow-y-auto"
      >
        <h5
          class="flex-y-center gap-1 border-l-[6px] border-green py-5 pl-2.5 text-dark text-lg leading-130 font-semibold mb-5 bg-gray-4"
        >
          <button
            class="icon-chevron rotate-180 text-xl leading-5 text-gray-2"
            @click="activeExtraChild = null"
          />
          {{ activeExtraChild?.title }}
        </h5>
        <div class="flex flex-col gap-4">
          <NuxtLink
            v-for="(item, index) in activeExtraChild?.children"
            :key="index"
            :to="item?.front_url"
            class="text-dark text-base font-medium leading-130"
          >
            {{ item?.title }}
          </NuxtLink>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import { useAuthStore } from '~/store/auth'
import type { ISiteMenus, ISiteTopMenus } from '~/types/main'

const router = useRouter()
const route = useRoute()

const activeChild = ref(0)
const activeExtraChild = ref<ISiteMenus | null>()

const openChild = (item: ISiteMenus) => {
  if (activeChild.value === item.id) {
    activeChild.value = 0
    return
  }
  activeChild.value = item.id
}

const openExtraChild = (item: ISiteMenus) => {
  if (!item.children) {
    return goToPage(item?.front_url)
  }
  activeExtraChild.value = item
}

const openContact = (item: string) => {
  if (item === '/contact-us') {
    return goToPage(item)
  }
  activeExtraChild.value = null
}

const goToPage = (url: string) => {
  if (url?.length) router.push(url)
}

interface Props {
  menus: ISiteMenus[]
  info: {
    phone_number: string
  }
  menu: ISiteTopMenus[]
  isFullMenu?: boolean
}
defineProps<Props>()

// Auth

const authStore = useAuthStore()
const token = useCookie('access_token')
const user = computed(() => authStore.user)

if (token.value) {
  authStore.getUser()
}
</script>
