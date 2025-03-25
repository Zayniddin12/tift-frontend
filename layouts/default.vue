<template>
  <div class="flex flex-col min-h-screen bg-gray-4">
    <LayoutHeader
      class="relative z-10"
      v-bind="{ isTransparent }"
      v-on="{ changeColor }"
    />
    <div class="min-h-[calc(100vh-479px)]">
      <slot class="relative z-0" />
    </div>
    <LayoutFooter class="bg-gray-4" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const isTransparent = ref(false)

const changeColor = (v: boolean) => {
  if (route.path !== '/') return
  isTransparent.value = v
}

watch(
  () => route.path,
  (newValue) => {
    isTransparent.value = newValue === '/'
  },
  { immediate: true }
)
</script>
