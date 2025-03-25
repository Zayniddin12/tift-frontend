<template>
  <div class="flex items-center bg-white flex-col md:flex-row">
    <nuxt-link class="block flex-shrink-0 img-bg">
      <img
        v-if="user.photo"
        v-lazy="user.photo"
        class="w-full h-full max-w-[227px] max-h-[297px] object-cover aspect-[223/297]"
        :alt="user.alt"
      />
    </nuxt-link>
    <div class="px-7 !py-6 md:py-0 h-fit flex w-full">
      <div>
        <CommonSectionTitle
          :title="user?.full_name"
          class="text-xl md:!text-2xl !font-bold"
        />
        <div
          class="text-green text-base font-medium leading-5 block mt-4 mb-3 md:mb-6"
          v-text="isSingle ? user?.position : user?.position?.title"
        />
        <p
          class="text-gray-1 text-sm font-normal leading-140 block mb-4 line-clamp-4"
          v-html="user?.short_description"
        />

        <AboutCardInfo
          v-if="isSingle"
          :data="{
            email: user.email,
            phone: user.phone_number,
            days: user.days_of_work,
          }"
          variant="col"
        />
        <div v-else>
          <p class="text-gray-1 text-sm font-normal block mb-4">
            {{ user.description }}
          </p>
          <nuxt-link :to="`leadership/${user.id}`">
            <BaseButton size="large" :text="$t('more')" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSingle: boolean
  user: {
    id: number
    photo: string
    alt: string
    full_name: string
    position: string
    description: string
    email: string
    phone_number: string
    days_of_work: string
    short_description?: string
  }
}

const props = defineProps<Props>()

useSeoMeta({
  title: props.user?.full_name,
  description: props.user?.short_description ?? props.user?.description,
  twitterTitle: props.user?.full_name,
  twitterDescription: props.user?.short_description ?? props.user?.description,
  ogTitle: props.user?.full_name,
  ogDescription: props.user?.description ?? props.user?.short_description,
  ogImage: props.user?.phone,
  twitterImage: props.user?.photo,
})
</script>

<style scoped>
.img-bg {
  box-shadow: 0 1.8540618419647217px 2.1031148433685303px 0 #00000006,
    0 4.455568313598633px 5.054077625274658px 0 #00000009,
    0 8.389439582824707px 9.516379356384277px 0 #0000000b,
    0 14.965327262878418px 16.975595474243164px 0 #0000000e,
    0 27.990997314453125px 31.7509822845459px 0 #00000010,
    0 67px 76px 0 #00000017;
}
</style>
