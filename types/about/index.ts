export interface IEmployee {
  id: number
  full_name: string
  position: number
  photo: string
  short_description?: string
}

export interface IDepartment {
  title: number
  slug: string
  description: string
  leader: IEmployee
}

export interface IReason {
  id: number
  title: string
  slug: string
  subtitle: string
  image: string
  order: number
}

export interface ICooporation {
  id: number
  title: string
  subtitle: string
  logo: string
  order: number
}

export interface ICooperationSingle {
  id: number
  title: string
  logo: string
  subtitle: string
  description: string
  background_image: string
  views_count: number
  order: number
  cover_image: string
}

export interface IVacancy {
  id: number
  title: string
  work_time: string
  region: {
    id: number
    name: string
  }
  is_active: boolean
}

export interface IVacancyDetail extends IVacancy {
  phone_number: string
  description: string
  submission_link: string
  views_count: number
}

export interface IAboutRanking {
  id: number
  statistic_section: {
    title: string
    slug: string
  }
  title: string
  value: string
}
