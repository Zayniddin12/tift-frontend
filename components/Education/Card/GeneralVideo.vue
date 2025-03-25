<script setup lang="ts">
defineProps<{
  poster: string
  link: string
}>()

const show = ref(false)
</script>

<template>
  <section class="!bg-white">
    <div
      class="w-full h-[200px] md:[350px] lg:h-[520px] flex items-center justify-center relative z-0"
    >
      <img
        v-if="poster"
        v-lazy="poster"
        class="absolute inset-0 w-full h-full object-cover -z-0"
        alt="image of video"
      />

      <div
        @click="show = true"
        class="relative z-2 w-[60px] h-[60px] p-3.5 bg-white bg-opacity-10 rounded-[100px] border border-white border-opacity-20 backdrop-blur-[30px] justify-center items-center inline-flex"
      >
        <div
          class="grow shrink basis-0 self-stretch justify-center items-center inline-flex cursor-pointer"
        >
          <div
            class="w-8 h-8 relative text-white text-3xl flex items-center justify-center"
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

      <!--      overlay -->
      <div class="absolute top-0 left-0 w-full h-full bg-dark/50 z-1"></div>
    </div>
    <CommonModalVideo :show="show" :link="link" @close="show = false" />
  </section>
</template>

<style scoped></style>
