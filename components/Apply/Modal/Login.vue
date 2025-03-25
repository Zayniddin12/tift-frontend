<template>
  <CommonModal
    body-class="bg-white rounded-none !w-[378px]"
    :title="t('login')"
    :show="show"
    disable-outer-close
    @close="closeModal"
  >
    <template #default>
      <div class="p-5">
        <FormGroup
          :label="t('phone_number')"
          is-required
          :errors="$v.number?.$errors"
        >
          <FormInput
            v-model="values.number"
            :error="$v.number?.$error"
            type="numeric"
            maska="+998 ## ### ## ##"
            placeholder="+998 00 000 00 00"
          />
        </FormGroup>
        <BaseButton
          size="large"
          :loading="loading"
          class="w-full border mt-6 !py-[11px]"
          :text="t('continue')"
          @click="continueToOTP"
        />
      </div>
    </template>
  </CommonModal>
</template>
<script setup lang="ts">
import { helpers, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'continue', number: string): void
}

const authStore = useAuthStore()
const { t } = useI18n()

const emit = defineEmits<Emits>()
const { handleError } = useErrorHandling()
const loading = ref(false)

function closeModal() {
  values.number = '+998'
  $v.value.$reset()
  emit('close')
}

defineProps<Props>()

const { values, $v } = useForm(
  {
    number: '+998',
  },
  {
    number: {
      required: helpers.withMessage(t('validations.required'), required),
      minLength: helpers.withMessage(
        () => t('validations.phone_number'),
        minLength(13)
      ),
      isValidPhone: helpers.withMessage(
        () => t('validations.invalid_code'),
        isValidPhoneWithCode
      ),
    },
  }
)

defineExpose({
  values,
})

function continueToOTP() {
  $v.value.$touch()
  if ($v.value.$invalid) return
  loading.value = true
  authStore
    .getSession(values.number)
    .then(() => {
      emit('close')
      emit('continue', values.number)
    })
    .catch((err) => {
      handleError(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
