export interface IStatistics {
  id: number
  statistic_section: {
    title: string
    slug: string
  }
  title: string
  value: number
}

export interface IPartner {
  id: number
  title: string
  logo: string
  url: string
  order: number
}

export interface ISiteMenus {
  id: number
  title: string
  slug: string
  order: number
  front_url: string
  children: ISiteMenus[]
}

export interface ISiteTopMenus {
  id: number
  title: string
  slug: string
  front_url: string
}

export interface IBranch {
  title: string
  slug: string
  subtitle: string
  video_url: string
  cover_image: string
}

export interface ISlider {
  id: number
  title: string
  subtitle: string
  image: string
}
