<script setup lang="ts">
import type { TClassName } from '~/types'
import type { IContact } from '~/types/contact'

interface Props {
  card?: IContact
  loading?: boolean
  titleClass?: TClassName
}

defineProps<Props>()
</script>

<template>
  <div class="p-4 bg-white">
    <BaseSkeleton
      width="100%"
      height="50px"
      v-bind="{ loading }"
      preloader-class="mb-4"
    >
      <h1
        :class="titleClass"
        class="text-dark text-2xl leading-130 font-semibold mb-1"
      >
        {{ card?.type?.title }}
      </h1>
    </BaseSkeleton>
    <hr v-if="!loading" class="bg-green h-1 w-[54px] mb-4" />
    <ul>
      <li class="flex items-center space-x-3 mb-3">
        <BaseSkeleton width="24px" height="24px" v-bind="{ loading }">
          <i class="icon-email text-green text-2xl" />
        </BaseSkeleton>
        <BaseSkeleton height="24px" width="200px" v-bind="{ loading }">
          <a
            :href="'email:' + card?.email"
            class="text-dark text-lg leading-130 font-medium hover:text-green transition-300"
            >{{ card?.email }}</a
          >
        </BaseSkeleton>
      </li>
      <li class="flex items-center space-x-3">
        <BaseSkeleton width="24px" height="24px" v-bind="{ loading }">
          <i class="icon-call text-2xl text-green" />
        </BaseSkeleton>
        <BaseSkeleton height="24px" width="200px" v-bind="{ loading }">
          <a
            :href="'tel:' + card?.phone_number"
            class="text-dark text-lg leading-130 font-medium hover:text-green transition-300"
          >
            {{ formatPhoneNumber(card?.phone_number) }}
          </a>
        </BaseSkeleton>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
