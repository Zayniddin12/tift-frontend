import type { IDefaultResponse } from '~/types'
import type { IBranch, IPartner, ISlider, IStatistics } from '~/types/main'
import type { IStudentStory } from '~/types/student'

export const useMainStore = definePiniaStore('mainStore', () => {
  const statistics = ref<IStatistics[]>([])
  const statisticsLoading = ref(true)

  const fetchStatistics = () => {
    if (statistics.value.length) {
      statisticsLoading.value = false
      return
    }
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IStatistics>>('/common/Statistic/', {
          params: {
            statistic_section__slug: 'main',
            limit: 6,
          },
        })
        .then((res) => {
          statistics.value = res.results
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          statisticsLoading.value = false
        })
    })
  }

  const storiesOfStudents = ref<IStudentStory[]>([])
  const storiesOfStudentsLoading = ref(true)
  const fetchStoriesOfStudents = () => {
    if (storiesOfStudents.value.length) {
      storiesOfStudentsLoading.value = false
    }
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IStudentStory>>(
          '/institute-experience/StudentStoryList/'
        )
        .then((res) => {
          storiesOfStudents.value = res.results
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          storiesOfStudentsLoading.value = false
        })
    })
  }

  const partnerList = ref<IPartner[]>([])
  const partnerListLoading = ref(true)
  const fetchPartnerList = () => {
    if (partnerList.value.length) {
      partnerListLoading.value = false
      return
    }
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IPartner>>('/common/PartnerList/', {
          params: { limit: 100 },
        })
        .then((res) => {
          partnerList.value = res.results
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          partnerListLoading.value = false
        })
    })
  }
  const branchList = ref<IBranch[]>([])
  const branchListLoading = ref(true)
  const fetchBranchList = () => {
    if (branchList.value.length) {
      branchListLoading.value = false
      return
    }
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IBranch>>('/institute-experience/BranchList/', {
          params: { limit: 100 },
        })
        .then((res) => {
          branchList.value = res.results
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          branchListLoading.value = false
        })
    })
  }
  return {
    statistics,
    statisticsLoading,
    fetchStatistics,
    storiesOfStudents,
    storiesOfStudentsLoading,
    fetchStoriesOfStudents,
    partnerList,
    partnerListLoading,
    fetchPartnerList,
    branchList,
    branchListLoading,
    fetchBranchList,
  }
})
