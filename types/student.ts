export interface IStudent {
  id: number
  full_name: string
  photo: string
}

export interface IStudentStory {
  id: number
  title: string
  student: IStudent
  slug: string
}

export interface IStudentStoryDetail {
  id: number
  title: string
  slug: string
  student: {
    id: number
    full_name: string
    avatar: string
  }
  description: string
  views_count: number
}

export interface IProject {
  slug: string
  title: string
  subtitle: string
  background_image: string
  file: string
  student: string
}

export interface IBlogs {
  slug: string
  title: string
  subtitle: string
  background_image: string
  student: string
}
