<template>
  <div class="relative max-md:overflow-hidden">
    <Transition name="fade" mode="out-in">
      <div
        :key="loading"
        class="flex-y-center gap-5 max-md:overflow-y-auto border-b border-gray-7"
        :class="{ 'mini-x-scroll': !loading }"
        @scroll="handleScroll"
      >
        <template v-for="(tab, idx) in list" :key="idx">
          <button
            :id="`item_${tab.slug}`"
            class="px-2 mb-4 flex items-center flex-y-center font-semibold text-sm text-gray-1 transition-300 relative cursor-pointer"
            :class="{ '!text-dark': modelValue === tab.slug }"
            @click="changeActive(tab.slug, $event)"
          >
            <span
              :class="[itemClass, { '!text-dark': activeTab === tab.slug }]"
              >{{ tab.title }}</span
            >
            <span v-if="tab.icon" class="mr-2 inline-block">
              <i
                :class="[
                  tab.icon,
                  iconClass,
                  { '!-rotate-90 !text-[#707377]': activeTab === tab.slug },
                ]"
              ></i>
            </span>
          </button>
        </template>
      </div>
    </Transition>
    <div
      class="absolute h-0.5 bg-green -translate-y-1/2 -bottom-px rounded-t-lg"
      :class="[activeClass, { 'transition-all duration-200': !isScrolling }]"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
    />
  </div>
</template>

<script lang="ts" setup>
import { debounce } from '~/utils'

interface INavs {
  id: number
  title: string
  slug: string | number
  has_program?: boolean
  order?: number
  icon?: string
}

interface Props {
  modelValue?: any
  list: INavs[]
  itemClass?: string
  activeClass: string
  iconClass?: string
  activeTextClass?: string
  loading?: boolean
  defaultTab: string | number
}

const props = defineProps<Props>()

const activeTab = ref(props.defaultTab)

const isScrolling = ref(false)

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'customChange', value: string | number): void
}
const emit = defineEmits<Emits>()

const active = ref({ left: 0, width: 0 })

function moveActive() {
  const item = document.getElementById(
    `item_${props.modelValue}`
  ) as HTMLButtonElement
  active.value = {
    left:
      item?.getBoundingClientRect().x -
        item?.parentElement?.getBoundingClientRect().x || 0,
    width: item?.offsetWidth || 0,
  }
}

function changeActive(tab: string | number, e: { target: HTMLButtonElement }) {
  pick(tab, e)
  emit('change', tab)
  // @ts-ignore
  activeTab.value = tab
}
const pick = (tab: string | number, e: { target: HTMLButtonElement }) => {
  moveActive()
  emit('update:modelValue', tab)
}

onMounted(() => {
  setTimeout(() => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    pick(props.modelValue, { target: item })
  }, 300)
})

function handleScroll() {
  isScrolling.value = true
  debounce('scroll', () => (isScrolling.value = false))
  moveActive()
}

watch(
  () => props.modelValue,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 100)
  }
)

watch(
  () => props.loading,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 500)
  }
)
</script>

<style scoped></style>
