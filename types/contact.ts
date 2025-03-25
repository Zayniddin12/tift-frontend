export interface IContactType {
  id: number
  title: string
  slug: string
}
export interface IContact {
  type: IContactType
  address: string
  phone_number: string
  email: string
}
