<script setup lang="ts">
import type { IContact } from '~/types/contact'

interface Props {
  card?: IContact
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="p-5 bg-white">
    <BaseSkeleton
      width="100%"
      height="52px"
      v-bind="{ loading }"
      preloader-class="mb-2"
    >
      <h1 class="text-dark text-2xl leading-130 font-semibold mb-2">
        {{ card?.type?.title }}
      </h1>
    </BaseSkeleton>
    <BaseSkeleton
      width="100%"
      height="22px"
      v-bind="{ loading }"
      preloader-class="mb-5"
    >
      <p class="text-base leading-130 text-gray-1 font-medium mb-5">
        {{ card?.address }}
      </p>
    </BaseSkeleton>
    <ul>
      <li class="flex items-center space-x-3 mb-3">
        <BaseSkeleton width="24px" height="24px" v-bind="{ loading }">
          <i class="icon-email text-green text-2xl" />
        </BaseSkeleton>
        <BaseSkeleton width="100px" height="24px" v-bind="{ loading }">
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
        <BaseSkeleton width="100px" height="24px" v-bind="{ loading }">
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
