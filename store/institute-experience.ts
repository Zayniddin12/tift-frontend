import type { IMenu } from '~/types'
import { IResponse } from '~/types/common/serverResponse'
import type { ICampusPicture, IComment } from '~/types/institute-experience'

export const useInstituteStore = definePiniaStore('instituteStore', () => {
  const menu = ref<IMenu>()
  const branchComments = ref<IComment[]>()
  const campusPictures = ref<ICampusPicture[]>()

  const menus = computed(() => menu.value)
  const fetchMenu = () => {
    return new Promise((resolve, reject) => {
      if (menu.value?.children?.length) {
        resolve(menu.value)
        return
      }
      useApi()
        .$get<IMenu>('common/SiteMenuDetail/institute-experience/')
        .then((res) => {
          menu.value = res
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  const fetchComments = (branch?: string) => {
    return new Promise((resolve, reject) => {
      if (branchComments.value?.length) {
        resolve(branchComments.value)
        return
      }
      useApi()
        .$get<IResponse<IComment>>('institute-experience/FAQBranchList/', {
          params: {
            branch__slug: branch,
          },
        })
        .then((res) => {
          branchComments.value = res.results
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  const fetchCampusPictures = (branch?: string) => {
    return new Promise((resolve, reject) => {
      if (campusPictures.value?.length) {
        resolve(campusPictures.value)
        return
      }
      useApi()
        .$get<IResponse<ICampusPicture>>(
          'institute-experience/CampusPictureList/',
          {
            params: {
              branch__slug: branch,
            },
          }
        )
        .then((res) => {
          campusPictures.value = res.results
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  return {
    menu,
    branchComments,
    campusPictures,
    fetchMenu,
    fetchComments,
    fetchCampusPictures,
  }
})
