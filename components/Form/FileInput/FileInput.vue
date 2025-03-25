<template>
  <div
    class="relative"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
  >
    <div
      class="flex items-center justify-between border border-gray-5 bg-gray-4 p-0.5 pl-4 relative"
      :class="[
        { '!border-red': error },
        { '!border-red !border-dashed': dragging },
        { '!border-dashed': dashed },
      ]"
    >
      <div v-if="media.file" class="flex-y-center">
        <p class="text-dark font-medium leading-130 text-sm">
          {{ media.media }}
        </p>
      </div>
      <span
        v-else
        class="font-medium leading-130 text-gray-2 text-sm transition-300"
        :class="{
          '!text-red': dragging,
        }"
      >
        {{
          modelValue || dragging
            ? $t('drop_file_here')
            : $t('drag_file_here_or_select_file')
        }}
      </span>
      <BaseButton
        class="!py-2 border border-gray-3"
        size="small"
        variant="secondary"
        :text="btnClearer ? $t('clear') : $t('select')"
        icon="icon-upload text-sm"
        @click="btnHandler"
      />
    </div>
    <input
      id="media"
      ref="mediaInput"
      :accept="accept"
      class="w-0 h-0 absolute opacity-0"
      :multiple="multiple"
      name="file"
      type="file"
      @change="handleFile"
      @click="$event.target.value = ''"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  label: string
  placeholder: string
  modelValue: object | string | File
  accept: string
  error?: boolean
  dashed?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accept:
    'image/*, pdf/*, doc/*, docx/*, xls/*, xlsx/*, ppt/*, pptx/*, txt/*, csv/*',
  multiple: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: File | string): void
}>()
const mediaInput = ref(null)
const btnClearer = ref(false)
const media = reactive({
  media: '',
  file: null,
})
const currentTarget = ref(null)
const handleFile = async (event: Event) => {
  const target = event?.target as HTMLInputElement | null
  if (target?.files === null) {
    return
  }
  if (target?.files) {
    handleUploader(target)
  }
}
const handleUploader = (target) => {
  const file = target.files?.[0]
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(target?.files[0])
    reader.onerror = (error) => reject(error)
  })
    .then(() => {
      // Do not touch this, or else You will find yourself DEAD!!!
      media.media = file?.name
      media.file = file
      emit('update:modelValue', file)
    })
    .catch((err) => {
      console.log(err)
    })
}
const getFile = () => {
  mediaInput?.value?.click()
}

function clearForm() {
  media.file = null
  media.media = ''
  emit('update:modelValue', '')
}

function btnHandler() {
  // form.media ? clearForm : handleMedia
  if (media.media && media.file) {
    clearForm()
  } else if (media.media && !media.file) {
    clearForm()
  } else {
    getFile()
  }
}

watch(
  () => media.media,
  (val) => {
    if (media.media && media.file) {
      btnClearer.value = true
    } else if (media.media && !media.file) {
      btnClearer.value = true
      emit('update:modelValue', media.media)
    } else {
      btnClearer.value = false
    }
    if (!val) {
      clearForm()
    }
  }
)
const dragging = ref(false)

const handleDragOver = (event: Event) => {
  event.preventDefault()
}

const handleDragEnter = (e: Event) => {
  dragging.value = true
  currentTarget.value = e?.target
}

const handleDragLeave = (e: Event) => {
  if (e?.target === currentTarget.value) {
    currentTarget.value = null
    dragging.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  dragging.value = false
  const files = event.dataTransfer?.items
  if (files) {
    handleUploader(event.dataTransfer)
  }
}

onMounted(() => {
  if (typeof props.modelValue === 'object') {
    media.media = props.modelValue.name
    media.file = props.modelValue
  } else {
    media.media = props.modelValue
  }
})
</script>
