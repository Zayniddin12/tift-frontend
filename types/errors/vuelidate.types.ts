export interface VuelidateErrorObject {
  $propertyPath: string
  $property: string
  $validator: string
  $message: string | Ref<string>
  $params: object
  $pending: boolean
  $response: any
  $uid: string
}
