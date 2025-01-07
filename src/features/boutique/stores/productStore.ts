import { DEFAULT_FILTERS } from '@/data/filters'
import type { FiltersInterface, ProductInterface } from '@/shared/interfaces'
import { defineStore } from 'pinia'

interface ProductState {
  products: ProductInterface[]
  filters: FiltersInterface
  page: number
  isLoading: boolean
  moreResults: boolean
}

export const useProducts = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    filters: { ...DEFAULT_FILTERS },
    page: 1,
    isLoading: false,
    moreResults: false,
  }),
})

// watchEffect(async () => {
//   state.isLoading = true
//   const products = await fetchProducts(state.filters, state.page)
//   if (Array.isArray(products)) {
//     state.products = [...state.products, ...products]
//     if (products.length < 20) {
//       state.moreResults = false
//     }
//   } else {
//     state.products = [...state.products, products]
//   }
//   state.isLoading = false
// })

// const filteredProducts = computed(() => {
//   return state.products.filter(product => {
//     if (
//       product.title
//         .toLocaleLowerCase()
//         .startsWith(state.filters.search.toLocaleLowerCase())
//     ) {
//       return true
//     } else {
//       return false
//     }
//   })
// })

// const updateFilter = (filterUpdate: FilterUpdate) => {
//   if (filterUpdate.search !== undefined) {
//     state.filters.search = filterUpdate.search
//   } else if (filterUpdate.priceRange) {
//     state.filters.priceRange = filterUpdate.priceRange
//   } else if (filterUpdate.category) {
//     state.filters.category = filterUpdate.category
//   } else {
//     state.filters = { ...DEFAULT_FILTERS }
//   }
// }
