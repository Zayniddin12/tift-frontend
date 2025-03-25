<template>
  <main class="mb-10">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="max-w-[982px] mx-auto">
      <CommonSectionWrapper
        class="pt-8 max-sm:min-h-svh"
        :title="t('local_app')"
      >
        <div v-if="!store.isSuccessful">
          <BaseFormStepper
            class="mb-6"
            v-bind="{
              steps: steps,
              currentStep: currentStep,
            }"
          />
          <section class="p-3 md:p-6 bg-white">
            <Transition name="dropdown" mode="out-in">
              <component
                :is="getComponent"
                ref="currentComponent"
                :application="store.local"
                :is-confirm="isConfirmClicked"
                class="transition-all transition-300 ease-in-out mb-8"
              />
            </Transition>

            <div
              class="flex flex-wrap max-sm:flex-col items-center justify-between"
            >
              <div v-if="currentStep === 1" class="flex items-center">
                <FormCheckbox v-model="acceptTerms" />
                <i18n-t
                  class="text-sm font-normal leading-[18.20px]"
                  keypath="terms_and_conditions"
                  tag="p"
                >
                  <template #term>
                    <a
                      target="_blank"
                      class="text-green"
                      href="/page/terms-of-us"
                    >
                      {{ $t('term') }}</a
                    >
                  </template>
                  <template #condition>
                    <a
                      target="_blank"
                      class="text-green"
                      href="/page/condition"
                    >
                      {{ $t('condition') }}</a
                    >
                  </template>
                </i18n-t>
              </div>
              <div class="flex max-sm:ml-0 max-sm:mt-5 ml-auto space-x-5">
                <BaseButton
                  class="transition-all transition-300"
                  variant="secondary-gray"
                  size="large"
                  :disabled="backBtnDisabled"
                  @click="prev"
                >
                  <span>{{ $t('back') }}</span>
                </BaseButton>
                <BaseButton
                  v-if="isConfirmClicked"
                  :disabled="!acceptTerms"
                  :loading="nextLoading"
                  size="large"
                  @click="next"
                >
                  <span v-if="currentStep === 4"
                    >{{ $t('send_application') }}
                  </span>
                  <span v-else>{{ $t('continue') }} </span>
                </BaseButton>
                <BaseButton v-else size="large" @click="handleConfirm">
                  <span>{{ $t('confirm') }}</span>
                </BaseButton>
              </div>
            </div>
          </section>
        </div>
        <Transition v-else class="transition-300">
          <ApplyCardConfirmationCard />
        </Transition>
      </CommonSectionWrapper>
    </div>
    <ApplyModalVerification
      :show="showOTPModal"
      :number="currentComponent?.values.phone_number"
      :error="invalidCode"
      :reset="reset"
      :back-to-phone="backToPhone"
      @update-invalid="invalidCode = false"
      @verify="verifyRegister"
      @close="closeModal"
    />
    <ApplyModalError
      :show="showPhoneRegistered"
      @close="showPhoneRegistered = false"
    />
  </main>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import Direction from '~/components/Apply/Section/Direction.vue'
import EducationBackground from '~/components/Apply/Section/EducationBackground.vue'
import Passport from '~/components/Apply/Section/Passport.vue'
import PersonalInformation from '~/components/Apply/Section/PersonalInformation.vue'
import { useErrorHandling } from '~/composables/useErrorHandler'
import { useApplyStore } from '~/store/apply'
import { useAuthStore } from '~/store/auth'
import type { IPassportInfo } from '~/types'
import { changeJsonToFormData } from '~/utils'

interface OneIdData {
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  phone: string
  email: string
  region: {
    id: number
    name: string
  }
  country: {
    id: number
    name: string
  }
  passport_id: string
}

const { t } = useI18n()
const store = useApplyStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const { handleError } = useErrorHandling()

const currentStep = ref(1)
const acceptTerms = ref(false)
const showOTPModal = ref(false)
const currentComponent = ref()
const showPhoneRegistered = ref(false)
const isConfirmClicked = ref(true)
const backBtnDisabled = ref(false)
const invalidCode = ref(false)
const nextLoading = ref(false)

const steps = [
  {
    name: t('first_step'),
    step: 1,
    desc: t('phone_verification'),
  },
  { name: t('second_step'), step: 2, desc: t('direction') },
  {
    name: t('third_step'),
    step: 3,
    desc: t('personal_information'),
  },
  { name: t('fourth_step'), step: 4, desc: t('exam') },
]

const components = [
  {
    step: 1,
    component: PersonalInformation,
  },
  {
    step: 2,
    component: Direction,
  },
  {
    step: 3,
    component: Passport,
  },
  {
    step: 4,
    component: EducationBackground,
  },
]

const getComponent = computed(() => {
  return components.find((component) => component.step === currentStep.value)
    ?.component
})

store.isSuccessful = false

const next = async () => {
  currentComponent.value.$v.$touch()
  if (currentComponent.value.$v.$invalid) return

  if (currentStep.value === 1) {
    nextLoading.value = true
    await authStore
      .getRegisterSession(currentComponent.value.values.phone_number)
      .then(() => {
        showOTPModal.value = true
        currentStep.value++
      })
      .catch((err) => {
        if (err?._data.errors?.[0]?.error === 'phone_already_exists') {
          showPhoneRegistered.value = true
        } else {
          handleError(err)
        }
      })
      .finally(() => {
        nextLoading.value = false
      })
    return
  }

  if (currentStep.value === 4) {
    const localApp = store.local
    localApp.birth_date = dayjs(store.local.birth_date).format('YYYY-MM-DD')
    localApp.passport_file_2 = localApp.passport_file_1
    localApp.type = 'local'

    if (localApp.emergency_contact?.length < 5) {
      localApp.emergency_contact = ''
    }

    const formData = changeJsonToFormData(localApp)
    try {
      nextLoading.value = true
      await store
        .createApplication(formData)
        .then(() => authStore.getUser())
        .finally(() => {
          nextLoading.value = false
        })
    } catch (error: any) {
      handleError(error)
    }
    return true
  }
  currentStep.value++
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const prev = () => {
  if (currentStep.value === 1) {
    router.push('/apply')
    return
  }
  currentStep.value--
}

const breadcrumbRoutes = computed(() => {
  return [
    {
      name: t('apply'),
      path: '/apply',
    },
    {
      name: t('local_app'),
      path: '',
    },
  ]
})

function verifyRegister(data) {
  authStore
    .register(data.number, data.otp)
    .then(() => {
      showOTPModal.value = false
    })
    .catch((err) => {
      handleError(err)
      if (err?._data.errors?.[0]?.error === 'code_invalid')
        invalidCode.value = true
    })
}

watch(
  () => showOTPModal.value,
  () => {
    invalidCode.value = false
  }
)

function handleConfirm() {
  if (currentStep.value !== 3) return
  currentComponent.value.$v.$touch()

  if (currentComponent.value.$v.$invalid) return
  useApi()
    .$post('/users/request-user-data/', {
      body: {
        passport: currentComponent.value.values.passport_serial_number,
        birth_date: dayjs(
          new Date(currentComponent.value.values.birth_date)
        ).format('YYYY-MM-DD'),
      },
    })
    .then((res: IPassportInfo) => {
      currentComponent.value.values.first_name = res.namelatin
      currentComponent.value.values.second_name = res.surnamelatin
      currentComponent.value.values.last_name = res.engsurname
      currentComponent.value.values.fathers_name = res.patronymlatin
      currentComponent.value.values.gender = res.sex === '1' ? 'male' : 'female'
      currentComponent.value.values.birth_place = res.birthplace
      currentComponent.value.values.pinfl = res.pinpp
      isConfirmClicked.value = true
      currentComponent.value.$v.$reset()
    })
    .catch((err) => handleError(err))
}
watch(
  () => currentStep.value,
  () => {
    currentStep.value === 3
      ? (isConfirmClicked.value = false)
      : (isConfirmClicked.value = true)
  }
)
watch(
  () => currentStep.value,
  () => {
    backBtnDisabled.value = !!(
      currentStep.value === 2 && route.query?.accept_terms
    )
  }
)

onMounted(() => {
  if (route.query?.stp) {
    currentStep.value = Number(route.query.stp)
  }
  if (route.query?.accept_terms) {
    acceptTerms.value = true
    backBtnDisabled.value = true
  }
})

const removeOneIdDetails = () => {
  router.replace({
    query: {},
  })
}
function reset(phone: string) {
  return authStore.getRegisterSession(phone)
}
const getOneIdDetails = () => {
  const oneIdDetails = route.query?.access_token as string

  if (!oneIdDetails) {
    return false
  }

  useApi()
    .$post<OneIdData>('application/OneId/login/', {
      body: {
        access_token: oneIdDetails,
      },
    })
    .then((res) => {
      store.local.first_name = res.first_name
      store.local.last_name = res.last_name
      store.local.phone_number = res.phone
      store.local.fathers_name = res.middle_name
      store.local.birth_date = res.birth_date
      store.local.region = res.region?.id
      store.local.citizenship = res.country?.id
      store.local.passport_serial_number = res.passport_id
      store.local.gender = res.gender

      removeOneIdDetails()
    })
}

getOneIdDetails()

onBeforeRouteLeave(() => {
  store.local = {}
})

if (process.client)
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
  })

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
  })
})
const backToPhone = () => {
  showOTPModal.value = false
  currentStep.value = 1
}

const closeModal = () => {
  showOTPModal.value = false
  currentStep.value = 1
}
</script>
