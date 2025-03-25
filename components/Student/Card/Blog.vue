<template>
  <nuxt-link
    :to="`/institute-experience/students/blogs/${card?.slug}`"
    class="flex flex-col w-full group transition-300 blog-card hover:-translate-y-2"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="aspect-[379/240] max-h-[240px] w-full">
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <img
          v-lazy="card?.background_image"
          :alt="card?.title"
          class="w-full h-full object-cover"
        />
      </BaseSkeleton>
    </div>
    <div class="content bg-gray-4 group-hover:bg-white p-5 transition-300">
      <BaseSkeleton
        width="100%"
        height="56px"
        v-bind="{ loading }"
        preloader-class="mb-2"
      >
        <h4
          class="text-dark text-lg font-semibold mb-2 group-hover:text-green transition-300 line-clamp-2"
        >
          {{ card?.title }}
        </h4>
      </BaseSkeleton>
      <BaseSkeleton width="100%" height="40px" v-bind="{ loading }">
        <p class="text-gray-1 text-sm font-normal leading-5 line-clamp-2">
          {{ card?.subtitle }}
        </p>
      </BaseSkeleton>
      <div class="flex-y-center gap-3 mt-5">
        <BaseSkeleton width="30px" height="30px" v-bind="{ loading }">
          <i class="icon-avatar text-3xl text-gray-1"></i>
        </BaseSkeleton>
        <div class="flex flex-col">
          <BaseSkeleton width="80px" height="16px" v-bind="{ loading }">
            <span class="text-gray-1 font-normal text-xs leading-4">
              {{ $t('author') }}
            </span>
          </BaseSkeleton>
          <BaseSkeleton width="100px" height="24px" v-bind="{ loading }">
            <h3 class="font-bold text-dark text-xs leading-6">
              {{ card?.student }}
            </h3>
          </BaseSkeleton>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { IBlogs } from '~/types/student'

interface Props {
  card?: IBlogs
  loading?: boolean
}
defineProps<Props>()
</script>

<style scoped>
.blog-card:hover {
  box-shadow: 0px 2.76726px 2.21381px 0px rgba(0, 0, 0, 0.03),
    0px 6.6501px 5.32008px 0px rgba(0, 0, 0, 0.02),
    0px 12.52155px 10.01724px 0px rgba(0, 0, 0, 0.02),
    0px 22.33631px 17.86905px 0px rgba(0, 0, 0, 0.01),
    0px 41.77761px 33.42209px 0px rgba(0, 0, 0, 0.01),
    0px 100px 80px 0px rgba(0, 0, 0, 0.01);
}
</style>
