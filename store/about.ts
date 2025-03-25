import type { IParams } from '~/types'
import type {
  ICooporation,
  IReason,
  IVacancy,
  IVacancyDetail,
} from '~/types/about'

export const useAboutStore = defineStore('about', {
  state: () => ({
    normativeDocs: undefined,
    aboutMenuList: {} as object,
    reasonsList: [] as IReason[],
    reasonCount: 0 as number,
    cooperation: [] as ICooporation[],
    vacancyTotal: 0 as number,
    vacancyList: [] as IVacancy[],
    vacancyLoading: false as boolean,
    aboutRankings: [],
  }),
  actions: {
    fetchNormativeDocs(params: IParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/NormativeDocumentList/`, { params })
          .then((res: any) => {
            this.normativeDocs = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchSiteMenuDetail() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/SiteMenuDetail/about-us`)
          .then((data: any) => {
            this.aboutMenuList = data
            this.aboutMenuList?.children?.push(
              {
                title: 'our_story',
                slug: 'our-story',
                front_url: '/about-us/our-story',
                children: null,
              },
              {
                title: 'our_mission',
                slug: 'our-mission',
                front_url: '/about-us/our-mission',
                children: null,
              }
            )
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchDepartmentList(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/EmployeeList/?department__slug=${slug}`)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchDepartmentDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/DepartmentDetail/${slug}`)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchReasons(params: IParams, merge = false) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/WhyChooseUsList/`, { params })
          .then((res: any) => {
            if (!merge) {
              this.reasonsList = res.results
            } else {
              this.reasonsList = [...this.reasonsList, ...res.results]
            }
            this.reasonCount = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchCooperation(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/InternationalCooperationList/`, {
            params: { education_type__slug: slug, offset: 0, limit: 50 },
          })
          .then((res: any) => {
            this.cooperation = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchSingleCooperation(id: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/InternationalCooperationDetail/${id}`)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchVacancies(params: IParams) {
      this.vacancyLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/VacancyList/`, { params })
          .then((res: any) => {
            this.vacancyList = [...this.vacancyList, ...res.results]
            this.vacancyTotal = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.vacancyLoading = false))
      })
    },

    fetchVacancyDetail(id: number) {
      return new Promise<IVacancyDetail>((resolve, reject) => {
        useApi()
          .$get(`common/VacancyDetail/${id}`)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchAboutRankings() {
      return new Promise((resolve, reject) => {
        if (this.aboutRankings.length) {
          resolve(this.aboutRankings)
          return
        }
        useApi()
          .$get(`common/Statistic/?statistic_section__slug=about-us`)
          .then((res: any) => {
            this.aboutRankings = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
