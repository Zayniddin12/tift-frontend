export interface IDefaultResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ICustomObject<T = string> {
  [key: string]: T
}

type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[]

export type TClassName = TClass | TClass[]

export interface IParams {
  page?: number
  limit?: number
  offset?: number
  search?: string
  is_leader?: boolean
}

export interface IMenu {
  title: string
  slug: string
  front_url: string
  children?: IMenu[]
}

export interface IStaticData {
  id: number
  title: string
  description: string
}

export interface ISearch {
  id: number
  title: string
  slug: string
  type: string
}

export interface IPassportInfo {
  status: number
  sex: string
  pinpp: string
  engname: string
  queryld: string
  document: string
  namelatin: string
  birth_date: string
  birthplace: string
  docdateend: string
  engsurname: string
  livestatus: string
  citizenship: string
  nationality: string
  birthcountry: string
  birthplaceid: string
  docdatebegin: string
  docgiveplace: string
  surnamelatin: string
  citizenshipid: string
  nationalityid: string
  patronymlatin: string
  birthcountryid: string
  docgiveplaceid: string
