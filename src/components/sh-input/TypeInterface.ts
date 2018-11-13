export default interface TypeInterface {
  type: 'text' | 'number' | 'password' | 'email'
  id: string
  name: string
  class: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  min?: number
  max?: number
  placeholder?: string
}

