<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <AboutSectionWrapper
      :title="t('leadership')"
      :active-route="'leadership'"
      v-bind="{ menu }"
    >
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <BaseSkeleton width="100%" height="300px" v-bind="{ loading }" />
          <div v-if="!loading">
            <AboutCardLeadership
              v-if="singleDetail"
              :user="singleDetail"
              is-single
            />

            <div
              v-if="singleDetail?.description"
              class="bg-white p-6 relative z-10 my-8"
            >
              <div
                class="static-text text-gray-1 text-sm font-normal"
                v-html="singleDetail?.description"
              />
            </div>
          </div>
        </div>
      </Transition>
    </AboutSectionWrapper>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  singleDetail?: any
  loading?: boolean
  menu?: any
}

const props = defineProps<Props>()

const breadcrumbRoutes = reactive([
  {
    path: '/about-us',
    name: t('about_us'),
  },
  {
    path: '/about-us/leadership',
    name: t('leadership'),
  },
])

watch(
  () => props.singleDetail,
  (val) => {
    breadcrumbRoutes.push({
      path: `/about-us/leadership`,
      name: val?.full_name,
    })
  }
)
</script>

<style scoped></style>
