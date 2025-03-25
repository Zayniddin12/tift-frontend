<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string | undefined
  image?: string
  link?: string
}

const props = defineProps<Props>()
defineEmits(['view'])

const getButtonStyles = computed(() => {
  if (props.image) {
    return 'border border-white/20 bg-white/10 !py-[11px] group-hover:bg-white !text-white group-hover:border-transparent backdrop-blur-[15px]'
  }

  return 'hover:bg-green-500 hover:text-white'
})
</script>

<template>
  <div
    class="relative p-5 shadow-partner-card transition-all transition-300 group hover:cursor-pointer z-0 flex flex-col justify-between"
    :class="{ 'bg-white': !image }"
  >
   <div>
     <h1
         class="text-2.5xl leading-130 font-bold text-white line-clamp-2 mb-3"
         :class="{ '!text-dark': !image }"
     >
       {{ title }}
     </h1>
     <p
         class="text-sm leading-140 text-gray-3 line-clamp-3 mb-5"
         :class="{ '!text-gray-1': !image }"
     >
       {{ subtitle }}
     </p>
   </div>

    <nuxt-link v-if="props.link" :to="props.link">
      <BaseButton
        :variant="image ? 'secondary' : 'gray'"
        size="large"
        class="w-full"
        :class="getButtonStyles"
        @click="$emit('view')"
      >
        <span :class="{ 'text-white group-hover:text-dark': image }">
          {{ $t('view_data') }}
        </span>
      </BaseButton>
    </nuxt-link>

    <BaseButton
      v-else
      :variant="image ? 'secondary' : 'gray'"
      size="large"
      class="w-full"
      :class="getButtonStyles"
      @click="$emit('view')"
    >
      <span :class="{ 'text-white group-hover:text-dark': image }">
        {{ $t('view_data') }}
      </span>
    </BaseButton>

    <div v-if="image">
      <img
        :src="image"
        :alt="'Image of ' + image"
        class="absolute left-0 top-0 w-full h-full object-cover object-center -z-2"
      />

      <!--    overlay  -->
      <span class="overlay absolute left-0 top-0 w-full h-full -z-1" />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background: linear-gradient(
    180deg,
    rgba(16, 22, 28, 0.92) 0%,
    rgba(16, 22, 28, 0.61) 45.14%,
    rgba(16, 22, 28, 0.4) 100%
  );
}
</style>
