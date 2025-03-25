<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { updateQuery } = useQueryChange()

const categorySlug = ref(route.params.slug)

watch(
  () => categorySlug.value,
  (newValue) => {
    loading.list = true
    params.directions__direction__slug = newValue
    updateQuery('directions__direction__slug', newValue)
  }
)

const { list, loading, params } = useListFetcher(
  '/common/InternationalCooperationList/',
  20,
  {
    directions__direction__slug: categorySlug.value,
  }
)
</script>
<template>
  <EducationWrapperAbout :title="$t('bachelor_economics_education')">
    <template #body>
      <section>
        <div
          v-if="list?.length"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[52px] mt-6"
        >
          <NuxtLink
            v-for="(card, idx) in list"
            :key="idx"
            :to="`/about-us/international-cooperation/${card.id}`"
          >
            <EducationCardUniversity v-bind="card"
          /></NuxtLink>
        </div>

        <CommonNoData
          v-else
          class="flex items-center justify-center py-3 md:py-0"
        />
      </section>
    </template>
  </EducationWrapperAbout>

  <EducationSectionStudyExchangeProgram />
</template>

<style scoped></style>

<!--import { useAboutStore } from '~/store/about'-->

<!--const aboutStore = useAboutStore()-->

<!--const fetchCooperation = async () => {-->
<!--await aboutStore.fetchCooperation()-->
<!--}-->

<!--fetchCooperation()-->

<!--const cooperation = computed(() => aboutStore.cooperation)-->
