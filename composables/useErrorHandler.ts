import { useI18n } from 'vue-i18n'

export function useErrorHandling() {
  const { showToast } = useCustomToast()
  const { t } = useI18n()

  function handleError(res: any) {
    if (res?.status === 404) {
      showError({ statusCode: 404 })
    }
    if (res?.status === 403) {
      showToast( res?._data?.detail, 'error')
    }
    if (res?.status === 500) {
      showToast('Server error', 'error' )
    }
    console.log(res?._data?.errors?.[0]?.message)
    showToast(t(res?._data?.errors?.[0]?.message), 'error' )

    return { error: res?._data?.errors?.[0]?.message }
  }

  return { handleError }
}
