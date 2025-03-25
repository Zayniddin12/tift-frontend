<script setup lang="ts">
import EducationBackground from '~/components/Apply/Section/EducationBackground.vue'
import PersonalInformation from '~/components/Apply/Section/PersonalInformation.vue'

const currentStep = ref(1)
const components = [
  {
    step: 1,
    component: PersonalInformation,
  },
  {
    step: 2,
    component: EducationBackground,
  },
]

const getComponent = computed(() => {
  return components.find((component) => component.step === currentStep.value)
    ?.component
})
</script>

<template>
  <div class="container">
    <CommonWrapper>
      <BaseFormStepper
        v-bind="{
          steps: [
            { name: $t('personal_information'), step: 1 },
            { name: $t('education_background'), step: 2 },
            { name: $t('direction'), step: 3 },
            { name: $t('passport'), step: 4 },
          ],
          currentStep: currentStep,
        }"
      />
    </CommonWrapper>

    <component :is="getComponent" />

    <div class="max-w-[400px] grid grid-cols-2 gap-5">
      <BaseButton @click="prev">
        <span>{{ $t('back') }}</span>
      </BaseButton>
      <BaseButton @click="next">
        <span>{{ $t('continue') }}</span>
      </BaseButton>
    </div>
  </div>
</template>

<style scoped></style>
