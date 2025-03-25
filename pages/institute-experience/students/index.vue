<template>
  <section>
    <BaseBreadcrumb :routes="breadcrumbRoutes" />
    <ExperienceSectionWrapper
      :title="data?.title"
      active-route="students"
      show-ads
      v-bind="{ menu }"
    >
      <div v-html="data?.description"></div>
      <h2 class="mt-8 text-2.5xl font-bold text-dark leading-130 mb-6">
        {{ $t('student_projects') }}
      </h2>
      <Transition name="fade" mode="out-in">
        <div :key="projectsLoading" class="flex flex-col gap-6">
          <StudentCardProject
            v-for="(card, index) in projectsLoading ? 3 : projects"
            :key="index"
            v-bind="{ card, loading: projectsLoading }"
            class="lg:even:flex-row-reverse"
          />
        </div>
      </Transition>
      <div class="flex-center mt-8">
        <BaseButton
          class="mx-auto !bg-white hover:!bg-gray-4"
          :text="$t('all_student_projects')"
          size="large"
          variant="gray"
          @click="$router.push('/institute-experience/students/projects')"
        />
      </div>
    </ExperienceSectionWrapper>
    <div class="bg-white pt-11 pb-16">
      <div class="container">
        <h2 class="mt-8 text-2.5xl font-bold text-dark leading-130 mb-6">
          {{ $t('student_blogs') }}
        </h2>
        <Transition name="fade" mode="out-in">
          <div
            :key="blogsLoading"
            class="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <StudentCardBlog
              v-for="(card, i) in blogsLoading ? 3 : blogs"
              :key="i"
              v-bind="{ card, loading: blogsLoading }"
            />
          </div>
        </Transition>
        <div class="flex-center mt-8">
          <BaseButton
            class="mx-auto !bg-white hover:!bg-gray-4"
            :text="$t('all_student_blogs')"
            size="large"
            variant="gray"
            @click="$router.push('/institute-experience/students/blogs')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useInstituteStore } from '~/store/institute-experience'
import { useStudentsStore } from '~/store/students'

const institutionStore = useInstituteStore()
const menu = computed(() => institutionStore.menu)
const breadcrumbRoutes = computed(() => [
  {
    path: '/institute-experience/students',
    name: data.value?.title,
  },
])
const { data } = useAsyncData('fetchSingle', () =>
  useApi().$get('/common/StaticPage/institute-experience-students/')
)

const studentStore = useStudentsStore()

const projects = computed(() => studentStore.projects)
const projectsLoading = computed(() => studentStore.projectsLoading)

studentStore.fetchProjects()

const blogs = computed(() => studentStore.blogs)
const blogsLoading = computed(() => studentStore.blogsLoading)

studentStore.fetchBlogs()

useSeoMeta({
  title: data.value?.title,
  description: richTextPurify(data.value?.description),
  twitterTitle: data.value?.title,
  twitterDescription: richTextPurify(data.value?.description),
  ogTitle: data.value?.title,
  ogDescription: richTextPurify(data.value?.description),
})

Promise.allSettled([institutionStore.fetchMenu()])
</script>
