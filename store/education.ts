import type { IDefaultResponse, IMenu } from '~/types'
import type { IResponse } from '~/types/common/serverResponse'
import type { IEducationTypes } from '~/types/education'
import type {
  IEducationDirectionDetails,
  IEducationFAQList,
  IEducationInfo,
} from '~/types/services/education.types'

export const useEducationStore = defineStore('education', {
  state: () => ({
    directionDetails: {} as IEducationDirectionDetails,
    educationInfo: [] as IEducationInfo[],
    faqList: [] as IEducationFAQList[],
    educationTypes: [] as IEducationTypes[],
    educationLoading: true,
    menu: {} as IMenu,
  }),

  actions: {
    getEducationTypes() {
      if (this.educationTypes.length > 0) {
        this.educationLoading = false
        return
      }
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IEducationTypes>>(
            '/education/EducationTypeList/'
          )
          .then((res) => {
            this.educationTypes = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => (this.educationLoading = false))
      })
    },
    getDirectionDetailsBySlug(
      slug: string
    ): Promise<IEducationDirectionDetails> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IEducationDirectionDetails>(
            `education/DirectionDetail/${slug}/`
          )
          .then((res) => {
            this.directionDetails = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    getEducationInfoBySlug(slug: string): Promise<IResponse<IEducationInfo>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IEducationInfo>>(
            `education/WhoIsThisProgramForList/?direction__slug=${slug}`
          )
          .then((res) => {
            this.educationInfo = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    getEducationFaqList(directionSlug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IEducationFAQList>>(
            `education/DirectionFAQList/?direction__slug=${directionSlug}`
          )
          .then((res) => {
            this.faqList = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    fetchSidebarMenu() {
      return new Promise((resolve, reject) => {
        if (this.menu?.children?.length) {
          resolve(this.menu)
          return
        }

        useApi()
          .$get<IMenu>(`common/SiteMenuDetail/education/`)
          .then((res) => {
            this.menu = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
