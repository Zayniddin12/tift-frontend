export interface ICitizenship {
  id: number
  name: string
}

export interface IRegion {
  id: number
  name: string
  country: ICountry
}

export interface ICountry {
  id: number
  name: string
}

export interface IEducationTypeList {
  id: number
  title: string
  has_program: boolean
  slug: string
  order: number
}

export interface IDirections {
  id: number
  title: string
  slug: string
}
