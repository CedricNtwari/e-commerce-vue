import type {
  ProductFormInterface,
  ProductInterface,
} from '@/shared/interfaces'
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from '@/shared/services/product.service'
import { defineStore } from 'pinia'

interface AdminProductState {
  products: ProductInterface[]
  isLoading: boolean
}

export const useAdminProductStore = defineStore('adminProduct', {
  state: (): AdminProductState => ({
    products: [],
    isLoading: false,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true
      const products = await fetchProducts()
      if (Array.isArray(products)) {
        this.products = products
      } else {
        this.products = [products]
      }
      this.isLoading = false
    },
    async tryDeleteProduct(productId: string) {
      const productIndex = this.products.findIndex(p => p._id === productId)
      if (productIndex !== -1) {
        await deleteProduct(productId)
        this.products.splice(productIndex, 1)
      }
    },

    async addProduct(productForm: ProductFormInterface) {
      const newProduct = await addProduct(productForm)
      if (newProduct) {
        this.products.push(newProduct)
      }
    },
    async editProduct(productId: string, productForm: ProductFormInterface) {
      const editedProduct = await editProduct(productId, productForm)
      if (editedProduct) {
        const stateProductIndex = this.products.findIndex(
          p => p._id === editedProduct._id,
        )
        this.products[stateProductIndex] = editedProduct
      }
    },
  },
})
