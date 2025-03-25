<script setup lang="ts"></script>

<template>
  <div class="person-card relative pt-6 z-1">
    <h1
      class="md:max-w-[260px] px-5 text-white text-2xl leading-130 font-bold mb-4"
    >
      {{ $t('appeal_to_rector') }}
    </h1>
    <BaseButton
      class="relative z-5 border border-white/20 mx-5 bg-white/10 !backdrop-blur-[15px] !text-white"
    >
      <nuxt-link
        to="/appeal-to-the-rector"
        class="!text-white text-sm leading-130 font-semibold"
        >{{ $t('contact') }}</nuxt-link
      >
    </BaseButton>

    <div class="w-full relative z-2">
      <img src="/images/about/person.webp" alt="Person Image" class="w-full" />
      <!--      object-cover aspect-[300/306]-->
    </div>
  </div>
</template>

<style scoped>
.person-card {
  background: linear-gradient(114deg, #2e4259 -75.53%, #10161c 96.48%);
}
.person-card::after {
  content: '';
  background: url('/images/about/up-pattern.svg') no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.person-card::before {
  content: '';
  background: url('/images/about/building-pattern.svg') no-repeat;
  position: absolute;
  bottom: -45%;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
