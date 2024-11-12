import type { Category } from './types'
export interface FiltersInterface {
  search: string
  priceRange: [number, number]
  category: Category
}

export interface FilterUpdate {
  search?: string
  priceRange?: [number, number]
  category?: Category
}
