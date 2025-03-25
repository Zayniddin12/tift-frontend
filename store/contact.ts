import type { IDefaultResponse } from '~/types'
import type { IContact } from '~/types/contact'

export const useContactStore = defineStore('contact', () => {
  const contactList = ref<IContact[]>([])
  const contactLoading = ref(true)
  const fetchContactList = () => {
    if (contactList.value.length) {
      contactLoading.value = false
      return
    }
    useApi()
      .$get<IDefaultResponse<IContact>>('/common/ContactUsList/')
      .then((res) => {
        contactList.value = res.results
      })
      .finally(() => {
        contactLoading.value = false
      })
  }

  return {
    contactList,
    contactLoading,
    fetchContactList,
  }
})
