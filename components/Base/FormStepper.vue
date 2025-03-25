<template>
  <div class="bg-white">
    <div
      id="parent-element"
      ref="parent"
      class="flex items-center max-sm:flex-col text-center px-2 sm:px-6 pt-3 sm:pt-4 pb-3 border-b-[4px] max-sm:before:hidden max-sm:after:hidden max-sm:border-none border-b-gray-5 relative before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-green after:absolute after:-bottom-6 after:left-0 after:h-5"
    >
      <div
        v-for="(item, index) in steps"
        :key="index"
        :data-step="item.step"
        class="w-full transition-all relative text-xs sm:text-sm font-medium sm:font-semibold text-gray-2 max-sm:before:hidden before:absolute before:top-7 before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-full before:border-2 before:border-gray-3 before:w-3 before:h-3 before:bg-white"
        :class="{
          'before:!border-green': item.step <= currentStep,
          '!text-green': item.step === currentStep,
        }"
      >
        <span class="hidden sm:block">{{ item.name }}</span>
        <span
          v-if="item.step === currentStep"
          class="block sm:hidden text-xl font-bold"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="flex items-center max-sm:flex-col px-6 pb-4 pt-3">
      <div
        v-for="(item, index) in steps"
        :key="index"
        class="w-full text-gray-1 text-xs font-medium leading-none text-center"
        :class="{ '!text-dark-100': item.step <= currentStep }"
      >
        <span class="hidden sm:block">{{ item.desc }}</span>
        <span
          v-if="item.step === currentStep"
          class="block sm:hidden text-xl font-bold"
        >
          {{ item.desc }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  steps: Array<{
    name: string
    step: number
    desc: string
  }>
  currentStep: number
}
const props = defineProps<Props>()

const parent = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)
const activeWidth = computed(() => {
  if (target.value) {
    const rect = target.value.getBoundingClientRect()
    const parentRect = parent.value!.getBoundingClientRect()
    return rect.left - parentRect.left + rect.width / 2
  }
  return 0
})
function getTargetElement() {
  return parent.value?.querySelector(
    `[data-step="${props.currentStep}"]`
  ) as HTMLElement
}
function setActiveWidth() {
  if (parent.value) {
    parent.value.style.setProperty(
      '--width-before',
      `${activeWidth.value - 1}px`
    )
  }
}
watch(
  () => props.currentStep,
  () => {
    target.value = getTargetElement()
    setActiveWidth()
  }
)
onMounted(() => {
  target.value = getTargetElement()
  setActiveWidth()
})
</script>
<style>
:root {
  --width-before: auto;
}
#parent-element::before {
  content: '';
  width: var(--width-before);
  transition: 1s width ease-in-out;
  /* Additional styles for the ::before pseudo-element */
}
</style>
