<script setup lang="ts">
defineProps<{
  fee: number
}>()
</script>

<template>
  <div
    class="card w-full h-[80px] md:h-[121px] py-2 md:py-7 flex items-center justify-center"
  >
    <div class="relative container flex justify-between items-center">
      <div>
        <h1 class="text-white text-xl md:text-2.5xl leading-130 font-bold mb-2">
          {{ $t('tutition') }}
        </h1>
        <hr class="bg-white h-0.5 w-[53px] opacity-20" />
      </div>

      <div class="flex items-center space-x-5">
        <div
          class="md:h-[64px] md:w-[64px] p-2.5 bg-white/10 flex items-center justify-center"
        >
          <i class="icon-cash text-xl md:text-[40px] text-white" />
        </div>
        <div>
          <h1
            class="text-white text-base md:text-2.5xl font-[800] mb-0.5 md:mb-1.5"
          >
            {{ formatNumberSpace(fee) }} UZS
          </h1>
          <p
            class="text-sm md:text-base font-medium leading-130 text-white opacity-80"
          >
            {{ $t('yearly_fee') }}
          </p>
        </div>
      </div>

      <img
        class="hidden md:block absolute z-1 right-[500px] -top-[70px] w-[71px]"
        src="/pattern/100.png"
        alt="100 ming uzs image"
      />
      <img
        class="hidden md:block absolute -top-[20px] -right-[20px] w-11"
        src="/pattern/5000.png"
        alt="5 ming uzs image"
      />
      <img
        class="hidden md:block absolute right-[70px] -bottom-[42px] w-[64px]"
        src="/pattern/50000.png"
        alt="50 ming uzs image"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: linear-gradient(90deg, #10161c -24.76%, #33b34a 105.69%);
}

.card::before {
  content: '';
}
</style>
