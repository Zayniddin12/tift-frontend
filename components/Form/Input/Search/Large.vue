<template>
  <div class="container">
    <div
      class="flex-y-center gap-2.5 md:gap-5 p-3 md:px-5 md:py-[15px] search-input bg-white"
      :class="{ ' md:-mx-4 ': route.name === 'search' }"
    >
      <FormInput
        v-model="search"
        class="!p-0 border-none !bg-white w-full"
        input-class="!text-base"
        v-bind="{ inputId, inputClass, placeholder }"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
        <template v-if="!noSearchIcon" #prefix>
          <span
            class="icon-search text-xl md:text-2xl leading-6 text-gray-2 font-bold"
            :class="iconClass"
          />
        </template>
        <template #suffix>
          <button
            v-if="!noClear"
            class="flex-center transition-300 opacity-0 scale-0 icon-x-mark text-gray-2 text-2xl leading-6 text-gray hover:text-green transition-300"
            :class="[{ '!opacity-100 !scale-100': search?.length }, iconClass]"
            @click="clearInput"
          ></button>
        </template>
      </FormInput>
      <hr class="border-none h-9 md:h-[42px] w-px bg-gray-4" />
      <BaseButton
        :text="$t('search')"
        size="large"
        class="h-9 w-[68px] flex items-center justify-center md:h-auto md:w-auto"
        @click="search ? $emit('search'): () => {}"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TClassName } from '~/types'

interface Props {
  noSearchIcon?: boolean
  placeholder?: string
  modelValue?: string
  inputClass?: TClassName
  iconClass?: TClassName
  inputId?: string
  noClear?: boolean
}
const props = defineProps<Props>()
const route = useRoute()

interface Emits {
  (e: 'search', v: string | undefined): void
  (e: 'clear'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'update:modelValue', v: string): void
}
const emit = defineEmits<Emits>()

const search = ref<string | undefined>('')

watch(
  () => search.value,
  (v) => {
    debounce('search', () => {
      emit('search', v)
    })
  }
)

function clearInput() {
  search.value = ''
  emit('clear')
}

watch(
  () => props.modelValue,
  (val) => {
    search.value = val
  },
  { immediate: true }
)

watch(
  () => search.value,
  (v) => {
    emit('update:modelValue', v)
  }
)
</script>

<style>
.search-input {
  box-shadow: 0 4px 24px 0 rgba(16, 22, 28, 0.02);
}
</style>
