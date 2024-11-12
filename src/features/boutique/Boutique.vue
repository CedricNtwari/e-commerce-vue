<script setup lang="ts">
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import data from '../../data/products'
import { reactive, computed } from 'vue'
import type {
  ProductInterface,
  ProductCartInterface,
  FiltersInterface,
  FilterUpdate,
} from '@/interfaces'
import { DEFAULT_FILTERS } from '../../data/filters'

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters: FiltersInterface
}>({
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS },
})

const addProductToCart = (productId: number): void => {
  const product = state.products.find(product => product.id === productId)
  if (product) {
    const productInCart = state.cart.find(product => product.id === productId)
    if (productInCart) {
      productInCart.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  }
}

const removeProductFromCart = (productId: number): void => {
  const productFromCart = state.cart.find(product => product.id === productId)
  if (productFromCart) {
    if (productFromCart?.quantity === 1) {
      state.cart = state.cart.filter(product => product.id !== productId)
    } else {
      productFromCart.quantity--
    }
  }
}

const cartEmpty = computed(() => state.cart.length === 0)

const filteredProducts = computed(() => {
  return state.products.filter(product => {
    if (
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return true
    } else {
      return false
    }
  })
})

const updateFilter = (filterUpdate: FilterUpdate) => {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category
  } else {
    state.filters = { ...DEFAULT_FILTERS }
  }
}
</script>

<template>
  <div class="boutique-container" :class="{ 'grid-empty': cartEmpty }">
    <Shop
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      :products="filteredProducts"
      :filters="state.filters"
      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
      class="cart"
    />
  </div>
</template>

<style lang="scss">
.boutique-container {
  display: grid;
  grid-template-columns: 75% 25%;
}

.grid-empty {
  grid-template-columns: 100%;
}

.cart {
  background-color: white;
  border-left: var(--border);
}

@media (max-width: 768px) {
  .boutique-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'shop'
      'cart';
  }

  .cart {
    grid-area: cart;
    border-left: none;
    border-top: var(--border);
  }
}
</style>
