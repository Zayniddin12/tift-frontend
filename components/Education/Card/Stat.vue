<template>
  <div>
    <h1
      class="mb-1.5 text-white text-3xl md:text-[52px] leading-130 font-extrabold uppercase"
    >
      {{ nFormatter(count, 1) }}
    </h1>
    <hr class="w-[100px] h-[2px] bg-white/2 mb-2 md:mb-5" />
    <h3
      class="mb-1 text-white/60 text-base leading-130 font-semibold"
      v-html="title"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number
  title: string
  subtitle: string
}

defineProps<Props>()

function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k +' },
    { value: 1e6, symbol: 'M +' },
    { value: 1e9, symbol: 'G +' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /.0+$|(.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
</script>

<style scoped></style>
