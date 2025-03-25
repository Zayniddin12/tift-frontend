<template>
  <CommonModal
    body-class="bg-white rounded-none !w-[378px]"
    :show="show"
    title=" "
    no-header
    @close="$emit('close')"
  >
    <template #default>
      <div class="p-5 relative">
        <i
          class="icon-x-mark cursor-pointer absolute text-gray-1 text-2xl top-4 right-4"
          @click="$emit('close')"
        />
        <div class="flex items-center flex-col">
          <div
            class="flex items-center justify-center w-[100px] h-[100px] mb-5 rounded-full bg-[#FFA800]"
          >
            <i class="icon-alert text-center text-white w-full text-7xl"></i>
          </div>
          <div class="mb-2">
            <h1 class="text-center text-2xl font-bold leading-[31.20px]">
              {{ $t('registered') }}
            </h1>
          </div>
          <div>
            <p
              class="w-[229px] text-center text-gray-2 text-base font-normal leading-snug"
            >
              {{ $t('registered_text') }}
            </p>
          </div>
        </div>
        <BaseButton
          size="large"
          variant="secondary-gray"
          class="w-full border mt-6 !py-[11px]"
          :text="$t('login')"
          @click="handleClick"
        />
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  number: string
}
interface Emits {
  (e: 'close'): void
  (e: 'open-login'): void
}
const router = useRouter()

defineProps<Props>()

const emit = defineEmits<Emits>()

function handleClick() {
  router.push('/apply')
}
</script>
