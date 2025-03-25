import { IDefaultResponse, IMenu } from '~/types'
import type { IBlogs, IProject } from '~/types/student'

export const useStudentsStore = definePiniaStore('studentsStore', () => {
  const projects = ref<IProject[]>()
  const projectsLoading = ref(true)
  const blogs = ref<IBlogs[]>()
  const blogsLoading = ref(true)
  const menu = ref<IMenu>()
  const fetchProjects = () => {
    if (projects.value?.length) return
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IProject>>(
          'institute-experience/StudentProjectsList/',
          {
            params: { limit: 3 },
          }
        )
        .then((res) => {
          projects.value = res.results
          resolve(res)
        })
        .catch((err) => reject(err))
        .finally(() => (projectsLoading.value = false))
    })
  }
  const fetchBlogs = () => {
    if (blogs.value?.length) return
    return new Promise((resolve, reject) => {
      useApi()
        .$get<IDefaultResponse<IBlogs>>(
          'institute-experience/StudentBlogsList/',
          {
            params: { limit: 3 },
          }
        )
        .then((res) => {
          blogs.value = res.results
          resolve(res)
        })
        .catch((err) => reject(err))
        .finally(() => (blogsLoading.value = false))
    })
  }

  const fetchMenu = () => {
    return new Promise((resolve, reject) => {
      if (menu.value?.children?.length) {
        resolve(menu.value)
        return
      }
      useApi()
        .$get<IMenu>('common/SiteMenuDetail/for-students/')
        .then((res) => {
          menu.value = res
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
  return {
    projects,
    projectsLoading,
    blogs,
    blogsLoading,
    menu,
    fetchProjects,
    fetchBlogs,
    fetchMenu,
  }
})
