<template>
  <nuxt-link
    :to="'/institute-experience/faculties/' + user.id"
    class="bg-white group card-shadow cursor-pointer p-5 relative h-44"
  >
    <div
      class="aspect-[100/100] relative h-28 w-28 border border-gray-3 -top-10"
    >
      <img
        v-if="user.photo"
        v-lazy="user.photo"
        class="absolute inset-0 w-full h-full object-cover"
        alt="user image"
      />

    </div>
    <div class="absolute bottom-5">
      <h1
        class="text-sm text-dark font-bold transition-all duration-300 ease-in-out group-hover:text-green"
      >
        {{ user.full_name.split(' ')[0] }}
      </h1>
      <h1
        class="text-sm text-dark font-bold transition-all duration-300 ease-in-out group-hover:text-green"
      >
        {{ user.full_name.split(' ').at(-1) }}
      </h1>
      <p class="text-sm text-green font-medium">{{ user.position.title }}</p>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  user: {
    id: number
    full_name: string
    photo: string
    position: {
      title: string
      slug: string
    }
  }
}

defineProps<Props>()
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
