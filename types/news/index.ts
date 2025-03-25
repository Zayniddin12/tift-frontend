export interface INewsCategory {
  id: number
  title: string
  slug: string
}

export interface INews {
  id: number
  title: string
  subtitle: string
  slug: string
  cover_image: string
  category: INewsCategory
  published_at: string
}

export interface INewsSingle {
  id: number
  title: string
  subtitle: string
  description: string
  background_image: string
  cover_image: string
  category: INewsCategory
  published_at: string
  views_count: number
}
