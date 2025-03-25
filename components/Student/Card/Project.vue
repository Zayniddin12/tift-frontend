<script setup lang="ts">
import type { IProject } from '~/types/student'

interface Props {
  card?: IProject
  loading?: boolean
}

const props = defineProps<Props>()

const router = useRouter()

const clickToCard = (e: Event) => {
  if ((e.target as HTMLElement).classList.contains('group/download')) {
    return
  }
  router.push(`/institute-experience/students/projects/${props.card?.slug}`)
}
</script>

<template>
  <div
    class="flex gap-4 lg:gap-6 flex-col lg:flex-row group cursor-pointer"
    :class="{ 'pointer-events-none': loading }"
    @click="clickToCard"
  >
    <div
      class="flex-shrink-0 w-full aspect-[379/240] border border-gray-3 max-w-[379px] mx-auto"
    >
      <BaseSkeleton width="100%" height="100%" v-bind="{ loading }">
        <img
          v-lazy="card?.background_image"
          :alt="card?.title"
          class="h-full w-full object-cover"
        />
      </BaseSkeleton>
    </div>

    <div class="flex flex-col lg:py-[38px] md:p-4 lg:px-0 w-full">
      <BaseSkeleton preloader-class="mb-2" width="100%" height="32px">
        <h1
          class="mb-2 text-dark text-xl md:text-2xl leading-130 font-semibold line-clamp-2 group-hover:text-green transition-300"
        >
          {{ card?.title }}
        </h1>
      </BaseSkeleton>
      <BaseSkeleton preloader-class="mb-4" width="100%" height="54px">
        <p class="mb-4 lg:mb-6 text-gray-1 text-sm leading-130 line-clamp-3">
          {{ card?.subtitle }}
        </p>
      </BaseSkeleton>

      <div class="grid grid-cols-2">
        <div class="flex items-center space-x-2 lg:space-x-3">
          <BaseSkeleton width="28px" height="28px" v-bind="{ loading }">
            <i class="icon-avatar text-gray-1 text-xl lg:text-2.5xl" />
          </BaseSkeleton>
          <div>
            <BaseSkeleton height="16px" width="80px" v-bind="{ loading }">
              <p class="text-xs leading-4 text-gray-1 mb-1 lg:mb-0">
                {{ $t('project_owner') }}
              </p>
            </BaseSkeleton>
            <BaseSkeleton height="16px" width="100px" v-bind="{ loading }">
              <h5
                class="text-dark text-xs lg:text-sm leading-130 lg:leading-7 font-bold"
              >
                {{ card?.student }}
              </h5>
            </BaseSkeleton>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <BaseSkeleton width="28px" height="28px" v-bind="{ loading }">
            <i class="icon-copy text-gray-1 text-xl lg:text-2.5xl" />
          </BaseSkeleton>
          <div>
            <BaseSkeleton height="16px" width="80px" v-bind="{ loading }">
              <p class="text-xs mb-1 lg:mb-0 leading-4 text-gray-1">
                {{ $t('project_files') }}
              </p>
            </BaseSkeleton>
            <BaseSkeleton height="16px" width="100px" v-bind="{ loading }">
              <a
                :href="card?.file"
                class="space-x-1 cursor-pointer group/download"
                target="_blank"
                download
              >
                <i
                  class="icon-download text-red text-base lg:text-xl pointer-events-none"
                />
                <span
                  class="text-dark text-xs leading-130 lg:text-sm lg:leading-7 font-bold group-hover/download:text-red transition-300 pointer-events-none"
                >
                  {{ $t('download_file') }}
                </span>
              </a>
            </BaseSkeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
