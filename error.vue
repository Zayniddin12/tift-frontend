<template>
  <main class="">
    <LayoutHeader />
    <section
      class="min-w-[308px] mt-[100px]  absolute absolute-center flex items-center justify-center flex-col"
    >
      <div
        class="not_found relative   z-0 flex items-center justify-center flex-col"
      >
        <h1
          class="absolute -bottom-[60px] z-10 text-center text-green text-[120px] font-black"
        >
          {{ error.statusCode }}
        </h1>
      </div>
      <div
        class="max-w-[580px] mt-12 mx-auto flex items-center flex-col justify-center"
      >
        <p class="mb-8 text-lg leading-140 text-gray-1 text-center font-normal">
          {{ $t('404_description') }}
        </p>

        <div
          class="flex items-center flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0"
        >
          <nuxt-link to="/">
            <BaseButton size="large" class="min-w-[168px] h-[42px]">
              {{ $t('go_to_home') }}
            </BaseButton>
          </nuxt-link>
          <nuxt-link to="/about-us">
            <BaseButton
              size="large"
              variant="secondary"
              class="min-w-[168px] h-[42px] border border-gray-3"
            >
              {{ $t('about_us') }}
            </BaseButton>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
interface Props {
  error: {
    statusCode: number
    message: string
  }
}
defineProps<Props>()
</script>
