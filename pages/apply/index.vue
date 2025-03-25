<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const { handleError } = useErrorHandling()

const showLoginModal = ref(false)
const showVerificationModal = ref(false)
const modalLogin = ref(null)
const buttonLoading = ref(false)
const invalidCode = ref(false)

function verifyLogin(data) {
  buttonLoading.value = true
  authStore
    .login(data.number, data.otp)
    .then(() => {
      showVerificationModal.value = false
      if (authStore.tokens.is_registered) {
        router.push('/apply/profile')
      } else {
        router.push({
          path: '/apply/local',
          query: {
            accept_terms: true,
            stp: 2,
          },
        })
      }
    })
    .catch((err) => {
      handleError(err)
      if (err?._data.errors?.[0]?.error === 'code_invalid')
        invalidCode.value = true
    })
    .finally(() => {
      buttonLoading.value = false
    })
}

function resetLogin(number: string) {
  return authStore.getSession(number)
}

const breadcrumbRoutes = computed(() => [
  {
    path: '',
    name: t('apply'),
  },
])

const openLoginModal = () => {
  showLoginModal.value = true
}
const backToPhone = () => {
  console.log('w')
  showVerificationModal.value = false
  showLoginModal.value = true
}
</script>

<template>
  <section class="mb-auto">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <CommonSectionWrapper class="pt-8" :title="t('apply')">
      <template #default>
        <div class="grid grid-cols-1 gap-6">
          <ApplyCard
            is-local
            :title="t('local_app')"
            :subtitle="t('local_app_subtitle')"
            @login="openLoginModal"
          />
        </div>
      </template>
    </CommonSectionWrapper>
    <ApplyModalLogin
      ref="modalLogin"
      :show="showLoginModal"
      @close="showLoginModal = false"
      @continue="showVerificationModal = true"
    />
    <ApplyModalVerification
      :show="showVerificationModal"
      :number="modalLogin?.values.number"
      :loading="buttonLoading"
      :error="invalidCode"
      :reset="resetLogin"
      :back-to-phone="backToPhone"
      @update-invalid="invalidCode = false"
      @verify="verifyLogin"
      @close="showVerificationModal = false"
    />
  </section>
</template>
