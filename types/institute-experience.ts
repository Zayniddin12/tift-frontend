export interface IComment {
  id: number
  question: string
  answer: string
  employee: {
    id: number
    full_name: string
    photo: string
    position: {
      id: number
      title: string
      slug: string
    }
    department?: string
  }
}

export interface ICampusPicture {
  order: number
  image: string
}
