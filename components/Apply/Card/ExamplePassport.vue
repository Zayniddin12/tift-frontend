<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-4">
    <div>
      <img
        src="/images/education/passport.svg"
        alt="Example Uzbekistan passport"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex justify-center flex-col">
      <h1 class="mb-2 text-dark text-base leading-normal font-semibold">
        {{ $t('passport_info_title') }}
      </h1>
      <p class="text-sm leading-140 text-gray-1 font-normal">
        {{ $t('passport_info_description') }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
