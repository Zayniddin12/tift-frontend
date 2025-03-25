<template>
  <label
    class="group inline-flex items-center relative select-none"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      v-bind="{ disabled, checked }"
      v-model="model"
      type="checkbox"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :value="value"
      :name="name"
    />
    <span
      class="shrink-0 duration-200 ease-in-out inline-block h-6 w-6 bg-white border border-gray-3 after:border-white peer-disabled:border-gray-100 peer-disabled:after:border-grey-100"
      :class="[
        {
          'after:transition-all after:duration-200 after:absolute after:left-2 after:top-1 after:w-2 after:h-3 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[45deg] after:opacity-0':
            !partial,
        },
        {
          'after:transition-all after:duration-200 after:absolute after:left-[8px] after:top-2 after:w-2 after:h-3 after:border-l-[2.2px] after:opacity-0 !border-green !bg-green after:rotate-90':
            partial,
        },

        partial ? '' : model ? ' after:opacity-100 after:rotate-180' : '',
        model ? '!border-green !bg-green' : '',
        checkboxStyles,
      ]"
    />
    <span class="ml-2 flex-y-center gap-1">
      <slot name="label">
        <span
          class="font-medium letter-3 leading-130 text-dark text-base"
          :class="[labelStyles]"
        >
          {{ label }}
        </span>
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  name?: string
  value?: string | number | boolean
  disabled?: boolean
  error?: boolean
  labelStyles?: string
  partial?: boolean | number
  checkboxStyles?: string
  infoIcon?: boolean
  infoText?: string
  infoLink?: string
}

const model = defineModel()
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// watch(
//   () => props.modelValue,
//   (value) => {
//     vm.value = value
//   }
// )
</script>
