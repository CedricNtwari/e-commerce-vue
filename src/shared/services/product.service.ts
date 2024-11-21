import type { FiltersInterface, ProductInterface } from '../../interfaces'
import { ref } from 'vue'
import type { Ref } from 'vue'

const BASE_URL = 'https://restapi.fr/api/projetproducts'

export async function fetchProducts(
  filter: FiltersInterface,
  page: number,
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams()
  if (filter.category !== 'all') {
    query.append('category', filter.category)
  }
  query.append('limit', '20')
  if (page !== 1) {
    query.append('skip', (page - 1) * 20 + '')
  }
  query.append(
    'price',
    `{"$gte":${filter.priceRange[0]}, "$lte":${filter.priceRange[1]}}`,
  )
  const products = await (await fetch(`${BASE_URL}?${query}`)).json()
  return products
}

export function useFetchProducts(): {
  products: Ref<ProductInterface[] | null>
  loading: Ref<boolean>
  error: Ref<unknown>
} {
  const products = ref<ProductInterface[] | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<unknown>(null)

  ;(async () => {
    try {
      products.value = await (await fetch(BASE_URL)).json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })()

  return {
    products,
    loading,
    error,
  }
}

  export async function deleteProduct(productId: string): Promise<string> {
    await fetch(`${BASE_URL}/${productId}`, {
      method: 'DELETE',
    })
    return productId
  }
