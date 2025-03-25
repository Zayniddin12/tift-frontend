<template>
  <CommonModal
    v-bind="{ show }"
    body-class="bg-white rounded-none !max-w-[378px]"
    :title="$t('online_payment')"
    @close="$emit('close')"
  >
    <div class="p-5 flex flex-col gap-5">
      <FormGroup :label="$t('amount')">
        <FormInput
          v-model="form.values.amount"
          v-maska="moneyMask"
          :placeholder="$t('enter_amount')"
          class="w-full"
        />
      </FormGroup>
      <BaseButton
        class="w-full"
        :text="$t('continue')"
        :loading="buttonLoading"
        @click="submit"
      />
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'

import { moneyMask } from '~/utils'

interface Props {
  show: boolean
}

defineProps<Props>()
defineEmits(['close'])
const { handleError } = useErrorHandling()

const buttonLoading = ref(false)

const form = useForm(
  {
    amount: '',
  },
  {
    amount: { required },
  }
)

function submit() {
  form.$v.value.$touch()
  if (!form.$v.$invalid) {
    buttonLoading.value = true
    useApi()
      .$post('users/create-order/', {
        body: {
          amount: Number(form.values.amount?.replace(/\s/g, '')),
        },
      })
      .then((res: any) => {
        window.location.href =
          res?.payment_link + `?return_url=${window?.location?.href}`
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        buttonLoading.value = false
      })
  }
}
</script>
