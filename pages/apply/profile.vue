<template>
  <section class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <ProfileSectionMe
      :key="profileData?.avatar"
      :avatar="profileData?.avatar"
      :info="profileData"
    />
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const { t } = useI18n()
const authStore = useAuthStore()

const profileData = computed(() => authStore.user)

function getProfile() {
  authStore.getUser()
}

getProfile()

const breadcrumbRoutes = computed(() => [
  {
    path: '/about-us/profile',
    name: t('profile'),
  },
])
</script>
