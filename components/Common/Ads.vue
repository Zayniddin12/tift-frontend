<template>
  <div v-if="data?.results[0]?.link">
    <a :href="data?.results[0]?.link" target="_blank">
      <nuxt-img
        :src="image ?? data?.results[0]?.image"
        alt="image"
        class="w-full hidden md:block"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
}

defineProps<Props>()

const { data } = useAsyncData(() => useApi().$get(`common/AdvertisementList/`))
</script>

<style scoped></style>
]
