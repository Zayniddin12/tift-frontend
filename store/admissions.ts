export const useAdmissionStore = defineStore('admissions', {
  state: () => ({
    admissionMenus: {},
    enrollmentSteps: [],
    enrollmentRequirements: [],
    educationTypeLists: [],
    eduTypeLoading: false,
    directionList: [],
    directionListLoading: false,
    serviceList: [],
    linkList: [],
  }),

  actions: {
    fetchSiteMenuDetail() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/SiteMenuDetail/admissions-and-scholarships/`)
          .then((data: any) => {
            this.admissionMenus = data
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchEnrollmentSteps() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`admissions/EnrollmentSteps/`)
          .then((data: any) => {
            this.enrollmentSteps = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchEnrollmentRequirements(type?: string) {
      return new Promise((resolve, reject) => {
        if (this.enrollmentRequirements.length) {
          resolve(this.enrollmentRequirements)
          return
        }
        useApi()
          .$get(`admissions/EnrollmentRequirementList/`, { params: { type } })
          .then((data: any) => {
            this.enrollmentRequirements = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchEducationTypeLists() {
      this.eduTypeLoading = true
      return new Promise((resolve, reject) => {
        if (this.educationTypeLists.length) {
          resolve(this.educationTypeLists)
          this.eduTypeLoading = false
          return
        }
        useApi()
          .$get(`education/EducationTypeList/`)
          .then((data: any) => {
            this.educationTypeLists = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.eduTypeLoading = false))
      })
    },

    fetchDirectionList(slug?: string) {
      return new Promise((resolve, reject) => {
        this.directionListLoading = true
        useApi()
          .$get(`education/DirectionList/`, {
            params: { education_type__slug: slug, offset: 0, limit: 50 },
          })
          .then((data: any) => {
            this.directionList = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.directionListLoading = false
          })
      })
    },

    fetchServiceList() {
      return new Promise((resolve, reject) => {
        if (this.serviceList?.length) {
          resolve(this.serviceList)
          return
        }
        useApi()
          .$get(`admissions/StudentServiceList/`)
          .then((data: any) => {
            this.serviceList = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchLinkList() {
      return new Promise((resolve, reject) => {
        if (this.linkList?.length) {
          resolve(this.linkList)
          return
        }
        useApi()
          .$get(`admissions/LinkList/`)
          .then((data: any) => {
            this.linkList = data?.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStudentServiceDetail(id: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`admissions/StudentServiceDetail/${id}`)
          .then((data: any) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
