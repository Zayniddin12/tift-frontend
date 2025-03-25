<script setup lang="ts">
import { convertToEmbed } from '~/utils'

interface Props {
  show: boolean
  link: string
}

const props = defineProps<Props>()
defineEmits(['close'])

const loading = ref(true)

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      setTimeout(() => (loading.value = false), 500)
    } else {
      loading.value = true
    }
  }
)
</script>

<template>
  <CommonModal
    :show="show"
    body-class="!max-w-[920px] mx-auto relative object-contain"
    header-style="bg-transparent border-none"
    @outer-click="$emit('close')"
  >
    <template #header>
      <button class="ml-auto group" @click="$emit('close')">
        <i class="icon-x-mark text-white text-2.5xl group-hover:text-green" />
      </button>
    </template>
    <template #default>
      <div
        class="w-full h-[400px] md:h-full overflow-hidden aspect-video relative rounded-2xl"
      >
        <Transition name="fade" mode="out-in">
          <div
            v-if="loading"
            class="absolute-center w-full h-full flex-center bg-white/10 backdrop-blur-md rounded-2xl"
          >
            <div class="spinner"></div>
          </div>
        </Transition>
        <iframe
          class="object-center w-full h-full"
          :src="`https://www.youtube.com/embed/${convertToEmbed(link)}?rel=0`"
          allowfullscreen
        />
      </div>
    </template>
  </CommonModal>
</template>

<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #52618f 41%);
  background: linear-gradient(0deg, #52618f 50%, #52618f 0) center/4.5px 100%,
  linear-gradient(90deg, #52618f 50%, #52618f 0) center/100% 4.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1.5s infinite steps(12);
}
.spinner::before,
.spinner::after {
  content: '';
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.spinner::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>