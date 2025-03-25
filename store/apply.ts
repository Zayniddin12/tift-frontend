import { IResponse } from '~/types/common/serverResponse'
import type {
  IApplyInternational,
  IApplyLocal,
  IEntranceExam,
} from '~/types/services/apply.types'

export const useApplyStore = defineStore('apply', {
  state: () => ({
    local: {} as IApplyLocal,
    international: {} as IApplyInternational,
    entranceExams: [] as IEntranceExam[],
    isSuccessful: false,
  }),

  actions: {
    getEntranceExams(): Promise<IResponse<IEntranceExam>> {
      return new Promise<IResponse<IEntranceExam>>((resolve, reject) => {
        useApi()
          .$get('application/EntranceExamList/')
          .then((res: IResponse<IEntranceExam>) => {
            this.entranceExams = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    createApplication(payload: any) {
      this.isSuccessful = false

      return new Promise((resolve, reject) => {
        useApi()
          .$post('application/ApplicationCreate/', {
            body: payload,
          })
          .then((res) => {
            this.isSuccessful = true
            resolve(res)
          })
          .catch((err) => {
            this.isSuccessful = false
            reject(err)
          })
      })
    },
  },
})
