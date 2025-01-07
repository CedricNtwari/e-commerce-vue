<script setup lang="ts">
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import { reactive, computed, watchEffect, provide, toRef, watch } from 'vue'
import type {
  ProductInterface,
  ProductCartInterface,
  FiltersInterface,
  FilterUpdate,
} from '@/shared/interfaces'
import { DEFAULT_FILTERS } from '../../data/filters'
import { fetchProducts } from '../../shared/services/product.service'
import { pageKey } from '@/shared/injectionKeys/pageKey'
import { useProducts } from './stores/productStore'
import { useCart } from './stores/cartStore'

const productStore = useProducts()
const cartStore = useCart()

// watch([() => state.filters.priceRange, () => state.filters.category], () => {
//   state.page = 1
//   state.products = []
// })
</script>

<template>
  <div class="d-flex flex-column">
    <Shop
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @load-more="state.page++"
      :more-results="state.moreResults"
      :products="filteredProducts"
      :filters="state.filters"
    />
    <Cart
      v-if="!cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
    />
  </div>
</template>

<style scoped lang="scss"></style>
