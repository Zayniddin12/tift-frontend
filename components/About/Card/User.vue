<template>
  <div class="relative">
    <nuxt-link
      v-if="link"
      :to="link"
      class="block flex-shrink-0 img-bg md:absolute md:-top-5 md:-left-5"
    >
      <img
        v-if="user?.photo"
        v-lazy="user?.photo"
        class="w-full h-full md:w-[112px] aspect-square md:aspect-[112/136] object-cover"
        :alt="user?.alt"
      />
    </nuxt-link>
    <div
      v-else
      class="block flex-shrink-0 img-bg relative md:absolute md:-top-5 md:-left-5"
    >
      <img
        v-if="user?.photo"
        v-lazy="user?.photo"
        class="w-full md:w-[112px] aspect-[112/136] object-cover"
        :alt="user?.alt"
      />
    </div>

    <div
      class="bg-white p-4 md:px-7 md:pl-[112px] h-fit py-5 md:min-h-[136px] flex items-center w-full card-bg"
    >
      <div>
        <nuxt-link v-if="link" :to="link">
          <h1
            class="font-bold text-xl transition-all duration-300 hover:text-green cursor-pointer"
          >
            {{ user?.full_name }}
          </h1>
        </nuxt-link>
        <h1 v-else class="font-bold text-xl">
          {{ user?.full_name }}
        </h1>
        <div
          class="text-green text-sm font-medium leading-5 block mt-2 mb-4 line-clamp-6"
          v-text="
            typeof user.position === 'string'
              ? user?.position
              : user?.position?.title
          "
        />
        <AboutCardInfo
          :data="{
            email: user?.email,
            phone: user?.phone_number,
            days: user?.days_of_work,
          }"
          variant="row"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSingle: boolean
  link?: string
  user: {
    id: number
    photo: string
    alt?: string
    full_name: string
    position: string | { title: string; slug: string }
    description?: string
    short_description?: string
    email?: string
    phone_number?: string
    days_of_work?: string
  }
}

defineProps<Props>()
</script>

<style scoped>
.card-bg {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
