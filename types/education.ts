export interface IEducationTypes {
  id: number
  title: string
  slug: string
  has_program: boolean
  order: number
}

export interface IEducationDirection {
  id: number
  title: string
  slug: string
  cover_image: string
  education_type: {
    title: string
    slug: string
  }
  tuition_fee: number
}

export interface IEducationProgram {
  title: string
  slug: string
  subtitle: string
  cover_image: string
}


export interface ILittleCardData {
  type: string
  description: string
  image: string
}