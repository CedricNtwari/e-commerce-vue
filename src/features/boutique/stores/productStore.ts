import { DEFAULT_FILTERS } from '@/data/filters'
import { seed, seed40Products } from '@/data/seed'
import type {
  FiltersInterface,
  FilterUpdate,
  ProductInterface,
} from '@/shared/interfaces'
import { fetchProductsWithFilters } from '@/shared/services/product.service'
import { defineStore } from 'pinia'

interface ProductState {
  products: ProductInterface[]
  filters: FiltersInterface
  page: number
  isLoading: boolean
  moreResults: boolean
  loaded: boolean
  needRefresh: boolean
}

export const useProducts = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    filters: { ...DEFAULT_FILTERS },
    page: 1,
    isLoading: false,
    moreResults: false,
    loaded: false,
    needRefresh: false,
  }),
  getters: {
    filteredProducts(state) {
      return state.products.filter(product =>
        product.title
          .toLocaleLowerCase()
          .startsWith(state.filters.search.toLocaleLowerCase()),
      )
    },
  },
  actions: {
    async fetchProducts() {
      this.isLoading = true
      const products = await fetchProductsWithFilters(this.filters, this.page)
      if (Array.isArray(products)) {
        this.products = [...this.products, ...products]
        if (products.length < 20) {
          this.moreResults = false
        }
      } else {
        this.products = [...this.products, products]
      }
      this.isLoading = false
    },
    updateFilter(filterUpdate: FilterUpdate) {
      if (filterUpdate.search !== undefined) {
        this.filters.search = filterUpdate.search
      } else if (filterUpdate.priceRange) {
        this.filters.priceRange = filterUpdate.priceRange
      } else if (filterUpdate.category) {
        this.filters.category = filterUpdate.category
      } else {
        this.filters = { ...DEFAULT_FILTERS }
      }
    },
    incPage() {
      this.page++
    },
    seed() {
      seed('projetproducts')
      seed40Products('projetproducts') // seed 40 products
    },
  },
})

export function initialFetchProducts() {
  const productStore = useProducts()
  if (!productStore.loaded || productStore.needRefresh) {
    productStore.fetchProducts()
    productStore.loaded = true
    if (productStore.needRefresh) {
      productStore.page = 1
      productStore.products = []
      productStore.needRefresh = false
    }
  }
}
