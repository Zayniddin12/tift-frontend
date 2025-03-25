import type { IDefaultResponse } from '~/types'
import type { IEvents } from '~/types/events'
import type { INews } from '~/types/news'

export const useNewsAndEventsStore = definePiniaStore(
  'newsAndEventsStore',
  () => {
    const news = ref<INews[]>()
    const newsLoading = ref(true)
    const events = ref<IEvents[]>()
    const eventsLoading = ref(true)
    const fetchNews = () => {
      if (news.value?.length) return
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<INews>>('press-service/NewsList/', {
            params: { limit: 7 },
          })
          .then((res) => {
            news.value = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (newsLoading.value = false))
      })
    }
    const fetchEvents = () => {
      if (events.value?.length) return
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IEvents>>('press-service/EventList/', {
            params: { limit: 4 },
          })
          .then((res) => {
            events.value = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (eventsLoading.value = false))
      })
    }
    return {
      news,
      newsLoading,
      events,
      eventsLoading,
      fetchNews,
      fetchEvents,
    }
  }
)
