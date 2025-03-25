<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import Direction from '~/components/Apply/Section/Direction.vue'
import EducationBackground from '~/components/Apply/Section/EducationBackground.vue'
import EnglishProficiency from '~/components/Apply/Section/EnglishProficiency.vue'
import PersonalInformation from '~/components/Apply/Section/International/PersonalInformation.vue'
import Passport from '~/components/Apply/Section/Passport.vue'
import { useApplyStore } from '~/store/apply'
import { changeJsonToFormData } from '~/utils'

const { t } = useI18n()
const store = useApplyStore()
const { showToast } = useCustomToast()

const currentStep = ref(1)
const currentComponent = ref()
const components = [
  {
    step: 1,
    component: PersonalInformation,
  },
  {
    step: 2,
    component: EnglishProficiency,
  },
  {
    step: 3,
    component: EducationBackground,
  },
  {
    step: 4,
    component: Direction,
  },
  {
    step: 5,
    component: Passport,
  },
]

const getComponent = computed(() => {
  return components.find((component) => component.step === currentStep.value)
    ?.component
})

// update store
store.isSuccessful = false

const next = async () => {
  currentComponent.value.$v.$touch()

  if (
    currentComponent.value.$v.$invalid ||
    currentComponent.value.passportError
  ) {
    return false
  }

  if (currentStep.value === 5) {
    const internationalApp = store.international
    internationalApp.birth_date = dayjs(store.local.birth_date).format(
      'YYYY-MM-DD'
    )
    internationalApp.highest_qualification_start_date = dayjs(
      store.international.highest_qualification_start_date
    ).format('YYYY-MM-DD')
    internationalApp.highest_qualification_end_date = dayjs(
      store.international.highest_qualification_end_date
    ).format('YYYY-MM-DD')
    internationalApp.passport_file_2 = internationalApp.passport_file_1
    internationalApp.type = 'international'

    const formData = changeJsonToFormData(internationalApp)
    try {
      await store.createApplication(formData)
    } catch (error: any) {
      for (const key in error._data) {
        const currentObject = error._data[key]
        for (const key2 in currentObject) {
          const message = currentObject[key2] || error.statusText
          showToast(message, 'error')
        }
      }
    }
    return true
  }
  currentStep.value++
}

const prev = () => {
  if (currentStep.value === 1) {
    return false
  }
  currentStep.value--
}

const breadcrumbRoutes = computed(() => [
  {
    path: '/apply',
    name: t('apply'),
  },
  {
    path: '',
    name: t('international_application'),
  },
])
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
</script>

<template>
  <main class="h-full min-h-[calc(100vh - 400px)]">
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="max-w-[982px] mx-auto">
      <CommonSectionWrapper class="pt-8" :title="t('international_app')">
        <div v-if="!store.isSuccessful">
          <BaseFormStepper
            class="mb-6"
            v-bind="{
              steps: [
                { name: $t('personal_information'), step: 1 },
                { name: $t('education_background'), step: 2 },
                { name: $t('english_proficiency'), step: 3 },
                { name: $t('direction'), step: 4 },
                { name: $t('passport'), step: 5 },
              ],
              currentStep: currentStep,
            }"
          />
          <section class="p-3 md:p-6 bg-white">
            <Transition name="dropdown" mode="out-in">
              <component
                :is="getComponent"
                ref="currentComponent"
                :application="store.international"
                is-international
                class="transition-all transition-300 ease-in-out mb-8"
              />
            </Transition>

            <div class="flex flex-x-end justify-end ml-auto space-x-5">
              <BaseButton
                class="transition-all transition-300"
                :class="{ hidden: currentStep === 1 }"
                variant="gray"
                size="large"
                @click="prev"
              >
                <span>{{ $t('back') }}</span>
              </BaseButton>
              <BaseButton size="large" @click="next">
                <span>{{ $t('continue') }}</span>
              </BaseButton>
            </div>
          </section>
        </div>
        <Transition v-else class="transition-300">
          <ApplyCardConfirmationCard />
        </Transition>
      </CommonSectionWrapper>
    </div>
  </main>
</template>

<style scoped></style>
