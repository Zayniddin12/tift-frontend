<template>
  <div>
    <div class="w-full h-[548px] flex items-center justify-center relative">
      <img
        v-lazy="poster"
        class="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-[548px] bg-dark/50"></div>
      <div
        class="w-[60px] h-[60px] p-3.5 bg-white bg-opacity-10 rounded-[100px] border border-white border-opacity-20 backdrop-blur-[30px] justify-center items-center inline-flex"
      >
        <div
          class="grow shrink basis-0 self-stretch justify-center items-center inline-flex cursor-pointer"
        >
          <div
            class="w-8 h-8 relative text-white text-3xl flex items-center justify-center"
            @click="show = true"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.33325 5.3335V26.6668L26.6666 16.0002L9.33325 5.3335Z"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <CommonModalVideo
      v-bind="{ show, link: video_url }"
      @close="show = false"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  poster: string
  video_url: string
}

defineProps<Props>()

const show = ref(false)
</script>

<style scoped></style>
