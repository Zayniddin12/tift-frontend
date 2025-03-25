<script setup lang="ts">
import type { IBranch } from '~/types/main'

interface Props {
  item?: IBranch
  loading?: boolean
}

defineProps<Props>()

const show = ref(false)
</script>
<template>
  <div class="flex relative flex-col bg-gray-4">
    <div
      class="w-full aspect-[580/260] flex items-center justify-center relative"
    >
      <img
        v-lazy="item?.cover_image"
        class="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div
        v-if="item?.video_url"
        class="w-[60px] h-[60px] p-3.5 bg-white bg-opacity-10 rounded-[100px] border border-white border-opacity-20 backdrop-blur-[30px] justify-center items-center inline-flex"
        @click="show = true"
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
    </div>
    <div class="p-4 md:p-6 h-[190px] flex flex-col justify-between">
      <h1 class="font-semibold text-xl leading-6">{{ item?.title }}</h1>
      <p class="text-sm font-normal my-2 line-clamp-2 text-gray-1">
        {{ item?.subtitle }}
      </p>
      <BaseButton
        class="w-full mt-6 border !bg-white hover:!bg-green !text-[#070707] hover:!text-white hover:!border-green !border-[#DCDFE4] backdrop-blur-lg"
        :text="$t('discover_more_here')"
        :class="{ 'pointer-events-none': loading }"
        size="large"
        @click="$router.push(`/institute-experience/${item?.slug ?? 'qwe'}`)"
      />
    </div>
    <CommonModalVideo
      v-bind="{ show, link: item?.video_url }"
      @close="show = false"
    />
  </div>
</template>
