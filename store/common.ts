import type { IResponse } from '~/types/common/serverResponse'
import type {
  ICitizenship,
  ICountry,
  IDirections,
  IEducationTypeList,
  IRegion,
} from '~/types/services/common.types'
import {
  IEducationDirectionDetails,
  IEmployment,
  type IReasonList,
} from '~/types/services/education.types'

export const useCommonStore = defineStore('common', {
  state: () => ({
    citizenship: [] as ICitizenship[],
    region: [] as IRegion[],
    country: [] as ICountry[],
    programmes: [] as IEducationTypeList[],
    directions: [] as IDirections[],
    directionsBySlug: [] as IDirections[],
    employmentLists: [] as IEmployment[],
    reasonsList: [] as IReasonList[],
  }),

  actions: {
    getReasonsList(): Promise<IResponse<IReasonList>> {
      return new Promise<IResponse<IReasonList>>((resolve, reject) => {
        useApi()
          .$get('/application/ApplicationReasonList/')
          .then((res: IResponse<IReasonList>) => {
            this.reasonsList = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getCitizenship(): Promise<IResponse<ICitizenship>> {
      return new Promise<IResponse<ICitizenship>>((resolve, reject) => {
        useApi()
          .$get('/common/CitizenshipList/')
          .then((res: IResponse<ICitizenship>) => {
            this.citizenship = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getRegion(): Promise<IResponse<IRegion>> {
      return new Promise<IResponse<IRegion>>((resolve, reject) => {
        useApi()
          .$get('/common/RegionList/')
          .then((res: IResponse<IRegion>) => {
            this.region = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getCountry(): Promise<IResponse<ICountry>> {
      return new Promise<IResponse<ICountry>>((resolve, reject) => {
        useApi()
          .$get('common/CountryList/')
          .then((res: IResponse<ICountry>) => {
            this.country = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getProgrammes(): Promise<IResponse<IEducationTypeList>> {
      return new Promise<IResponse<IEducationTypeList>>((resolve, reject) => {
        useApi()
          .$get('/education/EducationTypeList/')
          .then((res: IResponse<IEducationTypeList>) => {
            this.programmes = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getDirections(
      slug?: string,
      key?: string
    ): Promise<IResponse<IDirections>> {
      return new Promise<IResponse<IDirections>>((resolve, reject) => {
        useApi()
          .$get('education/DirectionList/', {
            params: {
              education_type__slug: slug,
              education_time_type__key: key,
              offset: 0,
              limit: 50,
            },
          })
          .then((res: IResponse<IDirections>) => {
            this.directions = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getDirectionsBySlug(slug: string): Promise<IResponse<IDirections>> {
      return new Promise<IResponse<IDirections>>((resolve, reject) => {
        useApi()
          .$get(`education/DirectionDetail/${slug}/`, {})
          .then((res: IResponse<IDirections>) => {
            this.directionsBySlug = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getEmployment(params?: {
      department__slug?: string
      is_leader?: string
      directions__direction__slug?: string
      search?: string
      limit?: number
      offset?: number
    }): Promise<IResponse<IEmployment>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IEmployment>>(`common/EmployeeList/`, {
            params,
          })
          .then((res) => {
            this.employmentLists = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
