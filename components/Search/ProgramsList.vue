<template>
  <Transition name="fade" mode="out-in">
    <div :key="loading.list">
      <div class="max-w-3xl mx-auto">
        <BaseSkeleton
          width="100%"
          height="400px"
          v-bind="{ loading: loading.list }"
        />
      </div>
      <SearchCard
        v-if="list?.length"
        :title="t('programmes')"
        link="education"
        no-btn
      >
        <div
          class="border border-borderColor-1 justify-between max-w-[782px] mx-auto"
        >
          <div
            v-for="(program, i) in list"
            :key="i"
            class="p-5 bg-gray-100 card"
          >
            <h3 class="font-semibold text-xl block mb-2">
              {{ program?.title }}
            </h3>
            <p class="text-sm font-normal text-dark leading-5 mb-4">
              {{ program?.description }}
            </p>
            <div class="grid grid-cols-2 gap-6 mb-5">
              <div class="flex-y-center gap-3">
                <i class="icon-clock text-2.5xl leading-7 text-gray-1" />
                <div>
                  <p class="text-xs font-normal leading-130 text-gray-1">
                    {{ $t('duration') }}
                  </p>
                  <p
                    v-if="program?.period"
                    class="text-sm leading-6 text-dark font-bold"
                  >
                    {{ $t('year_count', { count: program?.period }) }}
                  </p>
                </div>
              </div>

              <div class="flex-y-center gap-3">
                <i class="icon-calendar text-2.5xl leading-7 text-gray-1" />
                <div>
                  <p class="text-xs font-normal leading-130 text-gray-1">
                    {{ $t('intake') }}
                  </p>
                  <p
                    v-if="program?.admission_date"
                    class="text-sm leading-6 text-dark font-bold"
                  >
                    {{
                      dayjs(program?.admission_date)
                        .locale(locale)
                        .format('MMMM')
                    }}
                  </p>
                </div>
              </div>

              <div class="flex-y-center gap-3">
                <i class="icon-globe text-2.5xl leading-7 text-gray-1" />
                <div>
                  <p class="text-xs font-normal leading-130 text-gray-1">
                    {{ $t('language') }}
                  </p>
                  <p
                    v-if="program?.language"
                    class="text-sm leading-6 text-dark font-bold"
                  >
                    {{ $t(program?.language ?? 'uz') }}
                  </p>
                </div>
              </div>

              <div class="flex-y-center gap-3">
                <i class="icon-globe text-2.5xl leading-7 text-gray-1" />
                <div>
                  <p class="text-xs font-normal leading-130 text-gray-1">
                    {{ $t('location') }}
                  </p>
                  <p
                    v-if="program?.region"
                    class="text-sm leading-6 text-dark font-bold"
                  >
                    {{ program?.region?.name }}
                  </p>
                </div>
              </div>
            </div>
            <BaseButton
              class="self-start"
              :text="$t('discover_it')"
              size="large"
              @click="$router.push(`/education/bachelor/${program?.slug}`)"
            />
          </div>
        </div>
      </SearchCard>

      <CommonNoData v-if="!loading.list && !list?.length" class="my-14" />

      <div class="mt-8 flex justify-end">
        <BasePagination
          v-bind="{ currentPage }"
          :total="paginationData.count"
          :limit="params.limit"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()

const { loading, pageChange, list, paginationData, params, currentPage } =
  useListFetcher('education/DirectionList/', 4, {
    search: route.query.q,
  })

watch(
  () => route.query.q,
  (newValue) => {
    loading.list = true
    params.search = newValue
  }
)
</script>
