<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// import vueRecaptcha from 'vue3-recaptcha2'
import { news } from '~/data/data'
import { useInstituteStore } from '~/store/institute-experience'
import { useTranslate } from '~/utils/i18n-validators'

const { t } = useI18n()
const { showToast } = useCustomToast()
const store = useInstituteStore()
const faqs = computed(() => store.branchComments)

const breadcrumbRoutes = computed(() => [
  {
    path: '/appeal-to-the-rector',
    name: t('appeal_to_the_rector'),
  },
])

// const { contact } = useContactStore()
const { required, validPhoneNumber } = useTranslate()

const { values, $v } = useForm(
  {
    full_name: '',
    phone_number: '',
    subject_of_application: '',
    request: '',
    // recaptcha: '',
  },
  {
    full_name: {
      required,
    },
    phone_number: {
      required,
      validPhoneNumber,
    },
    subject_of_application: {
      required,
    },
    request: {
      required,
    },
    // recaptcha: { required },
  }
)

store.fetchComments()

const submit = () => {
  $v.value.$touch()

  if ($v.value.$invalid) {
    return false
  }
  useApi()
    .$post('/institute-experience/AppealToRector/', { body: values })
    .then(() => {
      values.full_name = ''
      values.phone_number = ''
      values.subject_of_application = ''
      values.request = ''
      // values.recaptcha = ''
      $v.value.$reset()
      showToast(t('appeal_sent_successfully'), 'success')
    })
    .catch((error) => {
      for (const key in error._data) {
        const currentObject = error._data[key]
        for (const key2 in currentObject) {
          const message = currentObject[key2] || error.statusText
          showToast(message, 'error')
        }
      }
    })
}
</script>
<template>
  <div>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <div class="bg-gray-4">
      <CommonSectionWrapper>
        <CommonSectionTitle :title="t('appeal_to_the_rector')" />
        <div class="grid grid-cols-1 md:grid-cols-12 mt-8 gap-6 items-start">
          <div
            ref="currentComponent"
            class="bg-white p-5 md:col-span-5 space-y-5"
          >
            <FormGroup :label="t('full_name')" :errors="$v.full_name?.$errors">
              <FormInput
                v-model="values.full_name"
                :error="$v.full_name?.$error"
                :placeholder="t('apply_form.placeholders.full_name')"
              />
            </FormGroup>
            <FormGroup
              :label="t('phone_number')"
              :errors="$v.phone_number?.$errors"
            >
              <FormPhoneNumber
                v-model="values.phone_number"
                :error="$v.phone_number?.$error"
                placeholder="00 000 00 00"
                :maxlength="17"
              />
            </FormGroup>
            <FormGroup
              :label="t('subject_of_application')"
              :errors="$v.subject_of_application?.$errors"
            >
              <FormInput
                v-model="values.subject_of_application"
                :error="$v.subject_of_application?.$error"
                :placeholder="
                  t('apply_form.placeholders.subject_of_application')
                "
              />
            </FormGroup>
            <FormGroup :label="t('request')" :errors="$v.request?.$errors">
              <FormTextarea
                v-model="values.request"
                :error="$v.request?.$error"
                :placeholder="t('request')"
                :rows="8"
              />
            </FormGroup>
            <!--            <vue-recaptcha-->
            <!--              size="normal"-->
            <!--              :sitekey="CONFIG.RECAPTCHA"-->
            <!--              @verify="verify"-->
            <!--              @expire="expire"-->
            <!--            >-->
            <!--            </vue-recaptcha>-->
            <BaseButton
              class="w-full"
              :text="t('send')"
              size="large"
              @click="submit()"
            />
          </div>
          <div class="p-5 md:col-span-7 bg-white h-fit">
            <h1 class="text-[28px] leading-[36px] font-bold">
              {{ $t('faq') }}
            </h1>
            <BaseCollapse
              v-for="(item, index) in faqs"
              :key="index"
              :title="String(item?.question)"
              :is-active="index === faqs?.length - 1"
            >
              <p>{{ item?.answer }}</p>
            </BaseCollapse>
          </div>
        </div>
      </CommonSectionWrapper>
    </div>
  </div>
</template>

<style scoped></style>
