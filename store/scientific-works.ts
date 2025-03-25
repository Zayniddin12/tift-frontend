import type { IDefaultResponse } from '~/types'

interface ICategory {
  title: string
  slug: string
}
export const useScientificWorks = definePiniaStore('scientificWorks', () => {
  const categories = ref<ICategory[]>()
  const categoriesLoading = ref<boolean>(true)
  const fetchCategories = () => {
    return new Promise((resolve, reject) => {
      categoriesLoading.value = true
      useApi()
        .$get<IDefaultResponse<ICategory>>(
          '/institute-experience/ScientificWorkCategoryList/'
        )
        .then((res) => {
          categories.value = res.results
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => (categoriesLoading.value = false))
    })
  }
  return {
    categories,
    categoriesLoading,
    fetchCategories,
  }
})
