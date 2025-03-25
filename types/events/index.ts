export interface IEventsCategory {
  id: number
  title: string
  slug: string
}

export interface IEvents {
  id: number
  title: string
  subtitle: string
  slug: string
  cover_image: string
  category: IEventsCategory
  published_at: string
  event_date: string
  button_text: string
}

export interface IEventsSingle {
  id: number
  title: string
  subtitle: string
  description: string
  background_image: string
  cover_image: string
  category: IEventsCategory
  published_at: string
  views_count: number
}
