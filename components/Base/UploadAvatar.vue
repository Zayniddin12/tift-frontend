<template>
  <div class="avatar-shadow">
    <Transition mode="out-in" name="fade">
      <div
        :key="file"
        class="w-[278px] h-[254px] overflow-hidden"
        :class="wrapperClass"
      >
        <div
          v-show="!file && !previewImageData"
          :class="[{ '!border-red': error }, inputClass]"
          class="flex bg-white flex-col w-full h-full justify-center transition-300 items-center border-2 border-white relative"
        >
          <button
            class="w-8 h-8 bg-[#F8F9FB] backdrop-blur-[6.5px] cursor-pointer flex-center hover:bg-white/30 transition-300 absolute top-3 right-3"
            @click="selectFile"
          >
            <i class="icon-plus text-xl icon-x-mark rotate-45 text-red" />
          </button>
          <img src="/default/user-circle.svg" alt="user" />
        </div>
        <div
          v-show="file || previewImageData"
          class="flex items-center w-full h-full justify-center relative cursor-pointer"
        >
          <div
            class="flex justify-end w-full h-full absolute top-0 left-0 bg-dark/30"
          >
            <div class="flex gap-3 p-3">
              <button
                class="w-8 h-8 bg-white/[8%] flex-center backdrop-blur-[6px] border border-white/[16%] transition-300 hover:bg-white/30"
                @click="selectFile"
              >
                <span class="icon-pen text-xl text-white" />
              </button>
              <button
                class="w-8 h-8 bg-white/[8%] flex-center backdrop-blur-[6px] border border-white/[16%] group"
                @click="removeFile"
              >
                <span
                  class="icon-can text-xl text-red transition-300 group-hover:text-red-850"
                />
              </button>
            </div>
          </div>
          <img
            :src="previewImageData"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

interface Props {
  title?: string
  maxSize?: number
  modelValue?: File | null
  error?: boolean
  label?: string
  wrapperClass?: any
  inputClass?: any
}

const props = withDefaults(defineProps<Props>(), {
  maxSize: 10 * 1024 * 1024,
  wrapperClass: '',
  inputClass: '',
  title: '',
})

interface Emits {
  (e: 'update:modelValue', v: File | null): void
}

const emit = defineEmits<Emits>()

const file = ref<File | null>(props?.modelValue ?? null)
const accept = reactive(['image/png', 'image/jpg', 'image/jpeg', 'image/svg'])
const previewImageData = ref('')

function selectFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept.join(',')
  input.onchange = (e: unknown) => {
    const files = e?.target?.files
    processFiles(files)
  }
  input.click()
  input.remove()
}

function processFiles(files: FileList) {
  if (files && files.length > 0) {
    const _file = files[0]
    if (_file.size <= props.maxSize) {
      file.value = _file

      const reader = new FileReader()
      reader.onload = (e) => {
        previewImageData.value = e.target.result
      }
      reader.readAsDataURL(_file)
    }
  }
}

function removeFile() {
  file.value = null
  previewImageData.value = ''
}

watch(
  () => file.value,
  () => {
    emit('update:modelValue', file.value)
  }
)

watch(
  () => props.modelValue,
  () => {
    if (typeof props.modelValue === 'string') {
      previewImageData.value = props.modelValue
    } else {
      file.value = props.modelValue ?? null
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.avatar-shadow {
  box-shadow: 0 67px 76px 0 rgba(0, 0, 0, 0.09),
    0 27.991px 31.751px 0 rgba(0, 0, 0, 0.06),
    0 14.965px 16.976px 0 rgba(0, 0, 0, 0.05),
    0 8.389px 9.516px 0 rgba(0, 0, 0, 0.05),
    0 4.456px 5.054px 0 rgba(0, 0, 0, 0.04),
    0 1.854px 2.103px 0 rgba(0, 0, 0, 0.03);
}
</style>
