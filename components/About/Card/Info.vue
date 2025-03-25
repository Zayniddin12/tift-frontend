<template>
  <div
    class="flex space-x-0"
    :class="
      variant === 'col'
        ? 'flex-col md:space-y-3'
        : 'flex-col space-y-2 md:flex-row md:space-x-6'
    "
  >
    <div v-if="data.email" class="flex-y-center">
      <i class="icon-email text-2xl mr-2 text-green"></i>
      <nuxt-link class="text-gray-1 text-xs font-medium">
        {{ data.email }}
      </nuxt-link>
    </div>
    <div v-if="data.phone" class="flex-y-center">
      <i class="icon-call text-2xl mr-2 text-green"></i>
      <nuxt-link class="text-gray-1 text-xs font-medium">
        {{ data.phone }}
      </nuxt-link>
    </div>
    <div v-if="data.days" class="flex-y-center">
      <i class="icon-clock text-2xl mr-2 text-green"></i>
      <nuxt-link class="text-gray-1 text-xs font-medium">
        {{ data.days }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant: 'row' | 'col'
  data: {
    email?: string
    phone?: string
    days?: string
  }
}
defineProps<Props>()
</script>

<style scoped></style>
