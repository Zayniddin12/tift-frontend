<template>
  <BaseDropdown
    :show="showDropdown"
    :head-class="[
      'flex items-center gap-1 text-gray-700 transition-300 cursor-pointer',
    ]"
    body-class="!w-[109px] border border-gray-5 bg-white max-md:right-0 max-md:left-auto"
    @toggle="handleDropdownToggle"
  >
    <template #head>
      <span
        class="icon-globe text-base leading-4 text-white transition-300"
        :class="{ 'max-md:!text-gray-2': !isTransparent || shouldStick  }"
      />
      <span
        class="text-xs font-semibold leading-130 text-white max-md:text-gray-300"
        :class="{ 'max-md:!text-dark': !isTransparent || shouldStick }"
      >
        {{ currentLanguage?.name }}
      </span>
      <span
        class="icon-chevron rotate-90 text-xs leading-3 text-white transition-300"
        :class="[
          { '!-rotate-90': showDropdown },
          { 'max-md:!text-gray-1': !isTransparent },
        ]"
      ></span>
    </template>
    <template #body>
      <div
        v-for="(lang, index) in languagesList"
        :key="index"
        class="w-full pl-2 group hover:bg-gray-4 transition-300"
        @click="changeLocale(lang?.code)"
      >
        <div
          class="flex items-center justify-between gap-4 py-2.5 pr-2 cursor-pointer transition-300 group-hover:bg-white-100 border-b border-b-gray-5 group-last:border-b-0"
        >
          <span
            class="text-xs font-medium leading-normal text-dark group-hover:text-green"
          >
            {{ lang.name }}
          </span>
          <transition name="fade">
           <i class="icon-check text-green" v-if="lang?.code === currentLanguage?.code"></i>
          </transition>
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script lang="ts" setup>
interface Props {
  variant: 'default' | 'transparent'
  isTransparent?: boolean
}

defineProps<Props>()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const showDropdown = ref(false)

function handleDropdownToggle(val: boolean) {
  showDropdown.value = val
}

const scrollTop = ref(0)

const checkSticky = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  return scrollTop.value > 0
}


window.addEventListener('scroll', () => {
  shouldStick.value = checkSticky()
})
const shouldStick = ref(checkSticky())


</script>
