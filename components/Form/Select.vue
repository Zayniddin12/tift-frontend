<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-gray-4 pl-4 px-3 py-2.5 border border-gray-5 cursor-pointer flex-center-between transition-300"
      :class="[
        selectedOptionStyles,
        { '!border-red !bg-white': showOptions },
        { 'border-red': error },
        { '!cursor-default  opacity-50': disabled },
      ]"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <div
          v-if="!value"
          class="text-gray-2 text-sm font-medium leading-130 truncate"
        >
          {{ placeholder }}
        </div>
        <div
          v-else
          class="text-dark text-base md:text-sm font-medium leading-130"
        >
          {{ value[labelKey] || value }}
        </div>
        <slot name="chevron">
          <span
            class="icon-chevron transition-300 inline-block text-xl leading-5 text-gray rotate-90 text-gray-1"
            :class="{ '!-rotate-90': showOptions }"
          />
        </slot>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-white border border-gray-5 rounded z-1 translate-y-3 overflow-x-hidden max-h-[220px] scroll-style options py-0.5"
      >
        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in options"
              :key="idx"
              class="hover:bg-gray-4 transition-300 pl-4 flex-center-between cursor-pointer"
              @click="onSelect(option)"
            >
              <slot name="option" :option="option" :index="idx">
                <h4
                  class="border-b border-gray-5 last:border-0 pl-0 p-3 text-dark text-2xs leading-130"
                  :class="{ 'font-medium': isActive(option) }"
                >
                  {{ option[labelKey] }}
                </h4>
              </slot>
              <i
                v-if="isActive(option)"
                class="icon-check text-xl text-green mr-3"
              />
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t('options_not_found') }}
          </div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full" />
          <Transition name="fade">
            <BaseLoader v-if="loading" />
          </Transition>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

type TOption =
  | string
  | number
  | { [key: string]: string | number }
  | { [key: string]: string | number }[]

export interface Props {
  modelValue: TOption
  options: TOption[]
  labelKey?: string
  valueKey?: string
  selectedOptionStyles?: string
  placeholder?: string
  infiniteScroll?: boolean
  searchText?: string
  loading?: boolean
  error?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  selectedOptionStyles: '',
  searchText: '',
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'on-select', value: any): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)

function toggleSelect(newValue = showOptions.value) {
  if (props.disabled) return
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option
  )
}

const value = ref(findOption(props.modelValue))
function onSelect(option: TOption) {
  if (props.disabled) return

  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey] || option)
  emit('on-select', option)
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))

function isActive(option: TOption) {
  return (
    option === value.value ||
    (value.value && value.value[props.valueKey] === option[props.valueKey]) ||
    option[props.valueKey] === value.value
  )
}
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})
watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (newV) => {
    value.value = findOption(newV)
  },
  {
    immediate: true,
  }
)

watch(
  () => props.options,
  () => {
    value.value = findOption(props.modelValue)
  },
  {
    deep: true,
  }
)
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.options {
  box-shadow: 0 2.76726px 2.21381px 0 rgba(0, 0, 0, 0.03),
    0 6.6501px 5.32008px 0 rgba(0, 0, 0, 0.02),
    0 12.52155px 10.01724px 0 rgba(0, 0, 0, 0.02),
    0 22.33631px 17.86905px 0 rgba(0, 0, 0, 0.01),
    0 41.77761px 33.42209px 0 rgba(0, 0, 0, 0.01),
    0 100px 80px 0 rgba(0, 0, 0, 0.01);
}
</style>
