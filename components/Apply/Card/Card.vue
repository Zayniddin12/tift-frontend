<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  isLocal?: boolean
}

defineProps<Props>()

defineEmits(['apply', 'login'])
</script>

<template>
  <div
    class="p-4 md:p-6 bg-white shadow-partner-card group hover:cursor-pointer"
  >
    <h1
      class="mb-3 text-center sm:text-left text-dark text-[28px] sm:text-2.5xl leading-9 font-bold line-clamp-2"
    >
      {{ title }}
    </h1>
    <p class="mb-11 text-gray-1 text-sm leading-tight line-clamp-3">
      {{ subtitle }}
    </p>

    <div
      class="grid grid-cols-1 gap-3 md:gap-6"
      :class="{ 'grid-cols-2': isLocal }"
    >
      <NuxtLink
        :to="isLocal ? '/apply/local' : 'apply/international'"
        class="block w-full"
      >
        <BaseButton
          variant="gray"
          size="large"
          class="w-full border !text-black !border-gray-3 !bg-gray-3 !py-[11px]"
          @click="$emit('apply')"
        >
          {{ $t('apply') }}
        </BaseButton>
      </NuxtLink>
      <BaseButton
        v-if="isLocal"
        size="large"
        class="w-full border !text-black !border-gray-3 !bg-gray-3 !py-[11px]"
        :text="$t('login')"
        @click="$emit('login')"
      />
    </div>
  </div>
</template>
