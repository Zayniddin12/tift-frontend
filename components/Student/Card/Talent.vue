<script setup lang="ts">
import type { IStudentStory } from '~/types/student'

interface Props {
  data?: IStudentStory
  loading?: boolean
}
defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/for-students/talent-and-career/${data?.slug}`"
    class="event-card transition-all duration-500 block hover:-translate-y-2 group"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="aspect-[278/192] relative w-full">
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <img
          v-lazy="data?.student?.photo"
          class="absolute inset-0 w-full h-full object-cover"
          :alt="data?.student?.full_name"
        />
      </BaseSkeleton>
    </div>
    <div class="bg-white p-5">
      <BaseSkeleton v-bind="{ loading }" width="100%" height="26px">
        <h3
          class="text-lg text-dark font-semibold leading-130 line-clamp-1 group-hover:text-green duration-300"
        >
          {{ data?.student?.full_name }}
        </h3>
      </BaseSkeleton>
      <BaseSkeleton
        v-bind="{ loading }"
        width="100%"
        height="40px"
        preloader-class="mt-2"
      >
        <p
          v-if="data?.title"
          class="text-gray-1 leading-140 text-sm font-normal line-clamp-2 mt-2"
        >
          {{ data?.title }}
        </p>
      </BaseSkeleton>
      <div
        class="inline-flex items-center justify-center text-green text-base font-medium leading-140 gap-1 mt-5"
      >
        <BaseSkeleton width="100px" height="24px" v-bind="{ loading }">
          {{ $t('read_more') }}
        </BaseSkeleton>
        <BaseSkeleton width="24px" height="24px" v-bind="{ loading }">
          <i class="icon-chevron text-green text-2xl" />
        </BaseSkeleton>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.event-card {
  box-shadow: 0px 2.767256498336792px 2.2138051986694336px 0px #00000008,
    0px 6.650102138519287px 5.32008171081543px 0px #00000005,
    0px 12.521552085876465px 10.017241477966309px 0px #00000005,
    0px 22.3363094329834px 17.869047164916992px 0px #00000004,
    0px 41.777610778808594px 33.422088623046875px 0px #00000003,
    0px 100px 80px 0px #00000002;
}

.event-card:hover {
  box-shadow: 0px 12px 28px 0px #5e5e5e33;
}
</style>
