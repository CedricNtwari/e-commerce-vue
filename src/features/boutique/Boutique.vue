<script setup lang="ts">
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import type { FilterUpdate } from '@/shared/interfaces'
import { useProducts } from './stores/productStore'
import { useCart } from './stores/cartStore'

const productStore = useProducts()
const cartStore = useCart()

function updateFilter(filterUpdate: FilterUpdate) {
  productStore.updateFilter(filterUpdate)
}

function incPage() {
  productStore.incPage()
}

function addProductToCart(productId: string) {
  cartStore.addProductToCart(productId)
}

function removeProductFromCart(productId: string) {
  cartStore.removeProductFromCart(productId)
}

productStore.$onAction(({ name, after, args }) => {
  if (name === 'updateFilter' && args[0].search === undefined) {
    after(() => {
      productStore.page = 1
      productStore.products = []
      productStore.moreResults = true
      productStore.fetchProducts()
    })
  } else if (name === 'incPage') {
    after(() => {
      productStore.fetchProducts()
    })
  }
})
</script>

<template>
  <div class="d-flex flex-column">
    <Shop
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @load-more="incPage"
      :more-results="productStore.moreResults"
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      :page="productStore.page"
    />
    <Cart
      v-if="!cartStore.cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="cartStore.cart"
    />
  </div>
</template>

<style scoped lang="scss"></style>
