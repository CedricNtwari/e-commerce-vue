import type { Category } from './types'

export interface ProductInterface {
  id: number
  title: string
  image: string
  price: number
  description: string
  category: Category
}
