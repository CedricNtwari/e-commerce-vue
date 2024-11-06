export type Category = 'gamer' | 'desktop' | 'streaming' | 'all'

export interface FiltersInterface {
  search: string
  priceRange: [number, number]
  category: Category
}

export interface FilterInterface {
  search?: string
  priceRange?: [number, number]
  category?: Category
}
