<script setup lang="ts">
import type { IDefaultResponse } from '~/types'
import type { ISiteMenus, ISiteTopMenus } from '~/types/main'

interface Props {
  isTransparent?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'change-color', v: boolean): void
}>()

const route = useRoute()

const fullMenu = ref(false)
function openMenu(value: boolean) {
  fullMenu.value = value
  emit('change-color', !value)
}
//
watch(
  () => route.path,
  () => {
    openMenu(false)
  }
)

const { data } = await useAsyncData<IDefaultResponse<ISiteMenus>>(
  'menuList',
  () => useApi().$get('common/SiteMenuList/')
)

const { data: info } = await useAsyncData<IDefaultResponse<ISiteMenus>>(
  'headerInfo',
  () => useApi().$get('common/HeaderInfo/')
)

const { data: headerTop } = await useAsyncData<IDefaultResponse<ISiteTopMenus>>(
  'fetchTopMenu',
  () => useApi().$get('common/TopHeaderMenuList/')
)

watch(
  fullMenu,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },
  { deep: true }
)
</script>

<template>
  <header class="sticky top-0">
    <LayoutHeaderTop class="" :info="info?.[0]" :menu="headerTop?.results" />

    <LayoutHeaderMid
      :menus="data?.results"
      :info="info?.[0]"
      v-bind="{ isTransparent }"
      :open-menu="fullMenu"
      class="sticky top-0"
      @open-menu="openMenu"
    />
    <LayoutHeaderBottom
      v-if="route.path === '/'"
      v-bind="{ isTransparent }"
      :menus="data?.results"
      class=""
      @hover-child="$emit('change-color', $event)"
    />
    <transition name="reverse-menu">
      <LayoutHeaderFullMenu
        v-if="fullMenu"
        :menus="data?.results"
        :info="info?.[0]"
        :menu="headerTop?.results"
        :is-full-menu="fullMenu"
      />
    </transition>
  </header>
</template>
