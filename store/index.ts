import type { IParams, ISearch } from '~/types'

export const useHomeStore = defineStore('home', {
  state: () => ({
    employeeList: undefined,
    employeeCount: 0,
    purposeLists: [],
    sidebarMenu: [],
    staticLoading: false,
    searchList: {},
  }),
  actions: {
    fetchSiteMenuDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/SiteMenuDetail/${slug}`)
          .then((data: any) => {
            this.sidebarMenu = data?.children
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchEmployeeList(params: IParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/EmployeeList/`, { params })
          .then((data: any) => {
            this.employeeList = data.results
            this.employeeCount = data.count
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchSingleEmployee(id: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/EmployeeDetail/${id}`)
          .then((data: any) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchPurposeList(params: IParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/PurposeList/`, { params })
          .then((data: any) => {
            this.purposeLists = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStaticData(slug: string) {
      this.staticLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/StaticPage/${slug}`)
          .then((data: any) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.staticLoading = false))
      })
    },

    fetchSearchList(search: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/SearchList/`, { params: { q: search } })
          .then((res: any) => (this.searchList = res))
      })
    },
  },
})
