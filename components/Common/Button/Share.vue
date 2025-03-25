<template>
  <BaseDropdown
    :show="showDropdown"
    body-class="!w-[172px]"
    @toggle="handleDropdownToggle"
  >
    <template #head>
      <div
        class="bg-gray-4 flex-center-between gap-4 relative group cursor-pointer"
      >
        <p class="truncate text-sm font-semibold leading-130 text-dark pl-4">
          {{ $t('share') }}
        </p>
        <button
          class="w-[42px] h-[42px] bg-[#E9EBEE] flex-center group-hover:bg-gray-3 relative shrink-0 icon-share text-gray-1 text-xl leading-5 transition-300"
        />
      </div>
    </template>
    <template #body>
      <div class="py-1">
        <div
          v-for="i in socials"
          :key="i"
          class="capitalize px-3 py-2 flex-y-center gap-2 text-sm text-gray-1 font-semibold leading-normal hover:bg-green/[0.08] hover:text-green group transition-300 cursor-pointer"
          @click="share(i, title)"
        >
          <i
            :class="`icon-sec-${i} text-2xl leading-6 text-gray-2 group-hover:text-green transition-300`"
          />
          {{ i }}
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
const socials = ['facebook', 'telegram', 'twitter']

const showDropdown = ref(false)

function handleDropdownToggle(val: boolean) {
  showDropdown.value = val
}

interface Props {
  title: string
}
defineProps<Props>()
</script>
