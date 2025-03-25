<template>
  <div class="flex flex-col gap-2">
    <div class="flex-center-between">
      <p
        class="text-sm leading-130 font-semibold text-dark"
        :class="labelClass"
      >
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
      </p>
      <transition name="fade-sm">
        <div v-if="!error">
          <p
            v-for="item in errors"
            :key="item.$uid"
            class="text-sm leading-130 font-normal text-red"
          >
            {{ item?.$message }}
          </p>
        </div>
        <p v-else class="text-sm leading-130 font-normal text-red">
          {{ errorLabel }}
        </p>
      </transition>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { TClassName } from '~/types'
import type { VuelidateErrorObject } from '~/types/errors/vuelidate.types'

interface Props {
  label: string
  labelClass?: TClassName
  error?: boolean
  errors?: VuelidateErrorObject[]
  errorLabel?: string
  isRequired?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Label',
  labelClass: '',
})
</script>
