<template>
  <CommonModal
    body-class="bg-white rounded-none !w-[378px]"
    :title="$t('verification')"
    :show="show"
    disable-outer-close
    @close="$emit('close')"
  >
    <template #default>
      <div ref="target" class="p-5">
        <h1 class="text-gray-1 text-sm font-normal leading-tight">
          {{ $t('verification_info') }}
        </h1>
        <div
          class="h-7 cursor-pointer mt-2 mb-7 px-2.5 py-1 bg-gray-6 justify-center items-center gap-1.5 inline-flex"
          @click="backToPhone"
        >
          <p class="text-xs font-medium leading-none">
            {{ hidePhoneNumber(number) }}
          </p>
        </div>
        <FormOTP v-model="otpCode" v-bind="{ error }" />
        <p
          class="text-gray-1 text-sm text-center font-normal leading-tight mt-4"
        >
          {{ $t('send_again') }}
          <span
            v-if="timer != 0"
            class="text-black text-xs font-semibold leading-none"
            >{{ formattedTimer }}
          </span>
          <span v-else class="text-green cursor-pointer" @click="resetTimer">
            <i class="icon-refresh" />
          </span>
        </p>
        <BaseButton
          size="large"
          :disabled="otpCode.length !== 6"
          class="w-full border mt-6 !py-[11px]"
          :text="$t('continue')"
          v-bind="{ loading }"
          @click="verifyOTP"
        />
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { useErrorHandling } from '~/composables/useErrorHandler'
import { useAuthStore } from '~/store/auth'

dayjs.extend(duration)

interface Props {
  show: boolean
  number: string
  error: boolean
  loading: boolean
  backToPhone: () => void
  reset: (phoneNumber: string) => Promise<void>
}
interface Emits {
  (e: 'close'): void
  (e: 'update-invalid'): void
  (e: 'verify', data: { number: string; otp: string }): void
}
const { handleError } = useErrorHandling()
const props = defineProps<Props>()

const emit = defineEmits<Emits>()

let intervalId: ReturnType<typeof setInterval> = null

const otpCode = ref('')
const timer = ref(60)
const target = ref(null)

const formattedTimer = computed(() => {
  return dayjs.duration(timer.value * 1000).format('mm:ss')
})

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    startTimer()
  }
})

watch(otpCode, (newValue: string, oldValue: string) => {
  if (newValue !== oldValue) emit('update-invalid')
})

function verifyOTP() {
  emit('verify', { number: props.number, otp: otpCode.value })
}

const resetTimer = () => {
  props
    .reset(props.number)
    .then(() => {
      clearInterval(intervalId)
      timer.value = 60
      startTimer()
    })
    .catch((err) => {
      handleError(err)
    })
}

const startTimer = () => {
  intervalId = setInterval(() => {
    if (timer.value > 0) timer.value -= 1
  }, 1000)
}

onUnmounted(() => {
  clearInterval(intervalId)
})

function hidePhoneNumber(phoneNumber: string) {
  return phoneNumber?.replace(/(\+\d{3} \d{2})\s\d{3}\s\d{2}/, '$1 *** **')
}
</script>
