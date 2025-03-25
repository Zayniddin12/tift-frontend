<template>
  <CommonSectionWrapper class="bg-gray-4 pb-16" :title="$t('our_education')">
    <div class="flex flex-col md:flex-row">
      <CollapseTransition>
        <div v-if="!activeParent" class="w-full md:w-1/3">
          <!--    parent mode     -->
          <div
            v-for="(i, idx) in getEducationTypes"
            :key="idx"
            class="px-3 py-4 md:px-6 md:py-9 group list-item"
            :class="[
              { active: activeChild === i?.id },
              { 'pointer-events-none': educationTypesLoading },
            ]"
            @click="showChild(i)"
          >
            <BaseSkeleton
              width="150px"
              height="24px"
              :loading="educationTypesLoading"
            >
              {{ i?.title }}
            </BaseSkeleton>

            <BaseSkeleton
              width="24ox"
              height="24px"
              :loading="educationTypesLoading"
            >
              <transition name="fade" mode="out-in">
                <BaseLoader
                  v-if="educationDirectionsLoading && activeChild === i?.id"
                  color="#113488"
                />
                <i
                  v-else
                  class="icon-chevron text-2xl leading-6 text-gray-2 group-hover:text-green transition-300"
                />
              </transition>
            </BaseSkeleton>
          </div>
        </div>
      </CollapseTransition>

      <!--   back router page   -->
      <CollapseTransition>
        <div
          v-if="activeChild || activeExtraChild"
          class="md:hidden h-[60px] flex items-center space-x-1 pl-1.5 border-l-[6px] border-green cursor-pointer border-b-gray-4 bg-[#FBFBFC]"
          @click="backActivePage"
        >
          <i class="icon-chevron text-gray-1 text-2xl rotate-180" />
          <span class="text-dark text-base font-semibold leading-130">
            {{ activeParent }}
          </span>
        </div>
      </CollapseTransition>
      <!--   child    -->
      <div
        class="w-full md:w-2/3 bg-no-repeat bg-center bg-cover flex flex-col md:flex-row h-[391px] relative"
        :style="`background-image: url(${
          activeExtraChildCover ?? '/pattern/education.webp'
        });`"
      >
        <CollapseTransition dimension="width" mode="out-in">
          <div
            v-if="
              activeChild && !educationDirectionsLoading && isExistExtraChild
            "
            class="overflow-y-scroll bg-white flex flex-col max-md:absolute inset-0 h-full max-md:w-full shrink-0"
          >
            <div
              v-for="(item, index) in educationDirections"
              :key="index"
              class="min-h-[60px] px-6 list-item group md:h-full !text-sm !font-medium cursor-pointer"
              :class="{ active: activeExtraChild === item?.id }"
              @click="getDirectionDetail(item)"
            >
              <p
                class="md:line-clamp-3 max-md:whitespace-nowrap md:w-[200px] shrink-0 max-md:overflow-hidden"
              >
                {{ item?.title }}
              </p>
              <transition name="fade" mode="out-in">
                <BaseLoader
                  v-if="directionDetailLoading && activeExtraChild === item?.id"
                  color="#113488"
                />
                <i
                  v-else
                  class="icon-chevron text-2xl leading-6 text-gray-2 group-hover:text-green transition-300"
                />
              </transition>
            </div>
          </div>
        </CollapseTransition>

        <!--         Extra child-->

        <transition name="fade-sm" mode="out-in">
          <div
            v-if="activeExtraChild"
            :key="activeExtraChild"
            class="w-full p-3 sm:p-6"
          >
            <div
              class="bg-white p-3 sm:p-7 sm:pt-6 h-full flex flex-col gap-6 justify-between border-t-gray-4 sm:border-none"
            >
              <div class="grid grid-cols-2 gap-6">
                <div
                  v-for="(item, i) in activeDirectionDetailList"
                  :key="i"
                  class="flex-y-center gap-3"
                >
                  <i
                    class="text-2.5xl leading-7 text-gray-1"
                    :class="item?.icon"
                  />
                  <div>
                    <p class="text-xs font-normal leading-130 text-gray-1">
                      {{ item?.label }}
                    </p>
                    <p class="text-sm leading-6 text-dark font-bold">
                      {{ item?.value?.toString() }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="text-sm font-normal text-dark leading-140 line-clamp-5"
                v-html="richTextPurify(directionDetail?.description, 0)"
              />
              <BaseButton
                class="w-full max-w-[320px] mx-auto sm:mx-0 sm:w-auto sm:self-start"
                :text="$t('discover_it')"
                size="large"
                @click="
                  $router.push(
                    `/education/bachelor/${directionDetail?.slug ?? '123'}`
                  )
                "
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </CommonSectionWrapper>
</template>

<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { useEducationStore } from '~/store/education'
import type { IDefaultResponse } from '~/types'
import type { IEducationDirection, IEducationTypes } from '~/types/education'
import type { IEducationDirectionDetails } from '~/types/services/education.types'

const { t, locale } = useI18n()
const router = useRouter()

const activeChild = ref()
const activeExtraChild = ref()
const isExistExtraChild = ref(true)
const activeExtraChildCover = ref()
const activeParent = ref()
const loading = ref(false)
const isMobile = ref(false)

const store = useEducationStore()
store.getEducationTypes()

// fetching education types
const fetchEducationTypes = () => {
  try {
    loading.value = true
    store.getEducationTypes()
  } finally {
    loading.value = false
  }
}

// defining mobile
if (process.client) {
  isMobile.value = window.innerWidth < 768
}

fetchEducationTypes()

const educationTypes = computed(() => store.educationTypes)

const getEducationTypes = computed(() => {
  return loading.value ? Array.from({ length: 4 }) : educationTypes.value
})

const educationTypesLoading = computed(() => loading.value)

const educationDirections = ref<IEducationDirection[]>([])
const educationDirectionsLoading = ref(false)
const getEducationDirections = (slug: string) => {
  educationDirectionsLoading.value = true
  useApi()
    .$get<IDefaultResponse<IEducationDirection>>('education/DirectionList/', {
      params: {
        education_type__slug: slug,
        offset: 0,
        limit: 50,
      },
    })
    .then((res) => {
      educationDirections.value = res.results
    })
    .finally(() => {
      educationDirectionsLoading.value = false
    })
}

const directionDetail = ref<IEducationDirectionDetails>()
const directionDetailLoading = ref(false)
const getDirectionDetail = (item: IEducationDirection) => {
  activeExtraChild.value = item?.id
  activeExtraChildCover.value = item?.cover_image

  if (isMobile.value) {
    activeParent.value = item?.title
    isExistExtraChild.value = false
  }

  useApi()
    .$get<IEducationDirectionDetails>(
      `education/DirectionDetail/${item?.slug}/`
    )
    .then((res) => {
      directionDetail.value = res
    })
    .catch(() => {
      showError({ statusCode: 404 })
    })
    .finally(() => {
      directionDetailLoading.value = false
    })
}

const activeDirectionDetailList = computed(() => {
  return [
    {
      icon: 'icon-clock',
      label: t('duration'),
      value: t('year_count', { count: directionDetail.value?.period }),
    },
    {
      icon: 'icon-calendar',
      label: t('intake'),
      value: dayjs(directionDetail.value?.admission_date)
        .locale(locale.value)
        .format('MMMM'),
    },
    {
      icon: 'icon-globe',
      value: directionDetail.value?.language?.join(', '),
      label: t('language'),
    },
    {
      icon: 'icon-map-pin',
      value: directionDetail.value?.region?.name,
      label: t('location'),
    },
  ]
})

const showChild = (child: IEducationTypes) => {
  if (child.id !== activeChild.value) {
    if (isMobile.value) {
      activeParent.value = child?.title
    }

    if (child.has_program) {
      activeChild.value = child.id
      getEducationDirections(child.slug)
    } else {
      if (child.slug === 'foundation') {
        router.push(`/education/`)
        return
      }
      router.push(`/education/${child.slug ?? '123'}`)
    }
  }
}

const backActivePage = () => {
  if (!isMobile.value) return

  if (activeExtraChild.value) {
    activeExtraChild.value = null
    isExistExtraChild.value = true
    return
  }
  activeChild.value = null
  activeParent.value = null
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-width: 0 6px 1px 0;
  border-bottom-color: #f7f8fa;
  border-right-color: transparent;
  background: #fff;
  transition: all 0.3s;
  color: #10161c;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  cursor: pointer;
}
.list-item:hover,
.list-item.active {
  border-right-color: #33b34a;
  color: #33b34a;
  background: #fbfbfc;
}
.list-item:last-child {
  border-bottom: 0;
}
</style>
