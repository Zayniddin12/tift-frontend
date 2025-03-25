<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ICampusPicture } from '~/types/institute-experience'

interface Props {
  campusPictures: ICampusPicture[] | undefined
}

defineProps<Props>()
const { t } = useI18n()

const show = ref(false)
const index = ref(0)

const openModal = () => {
  show.value = true
}
</script>

<template>
  <!-- responsive -->
  <CommonWrapper :title="$t('campus_pictures')" :load-more-text="t('more')">
    <Transition name="fade" mode="out-in">
      <div :key="campusPictures?.length">
        <div
          v-if="campusPictures?.length"
          class="grid grid-cols-1 md:grid-rows-[repeat(7,_100px)] md:grid-cols-3 gap-3 md:gap-y-5 md:gap-x-6"
        >
          <img
            v-for="(item, i) in campusPictures"
            :key="i"
            :src="item.image"
            alt="`image of campus`"
            :class="`image-${i + 1} h-full w-full object-cover cursor-pointer`"
            @click="openModal"
          />

          <CommonModalPhoto
            :show="show"
            :images="campusPictures"
            @close="show = false"
          />
        </div>

        <CommonNoData v-else class="my-14" />
      </div>
    </Transition>
  </CommonWrapper>
</template>

<style scoped>
.image-1 {
  grid-area: 1 / 1 / 3 / 2;
}
.image-2 {
  grid-area: 1 / 2 / 3 / 3;
}
.image-3 {
  grid-area: 1 / 3 / 5 / 4;
}
.image-4 {
  grid-area: 3 / 1 / 6 / 3;
}
.image-5 {
  grid-area: 6 / 1 / 8 / 2;
}
.image-6 {
  grid-area: 6 / 2 / 8 / 3;
}
.image-7 {
  grid-area: 5 / 3 / 8 / 4;
}

@media (max-width: 768px) {
  .image-1,
  .image-2,
  .image-3,
  .image-4,
  .image-5,
  .image-6,
  .image-7 {
    grid-area: auto;
    aspect-ratio: 16/9;
  }
}
</style>
