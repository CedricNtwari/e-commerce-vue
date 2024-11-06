<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import data from './data/products'
import { reactive, computed } from 'vue'
import type { ProductInterface, ProductCartInterface, FiltersInterface, FilterUpdate } from '@/interfaces'
import { DEFAULT_FILTERS } from './data/filters'

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters:FiltersInterface
}>({
  products: data,
  cart: [],
  filters:{...DEFAULT_FILTERS}
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

const filteredProducts= computed(() => {
  return state.products.filter((product)=>{
    if(
      product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0]&&
      product.price <= state.filters.priceRange[1]&&
      (product.category === state.filters.category || state.filters.category === "all")
    ){
      return true
    }else {
      return false
    }
  })
})

const updateFilter = (filterUpdate: FilterUpdate) => {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
}


</script>

<template>
  <div class="app-container" :class="{ gridEmpty: cartEmpty }">
    <TheHeader class="header b1" />
    <Shop @update-filter="updateFilter"
         @add-product-to-cart="addProductToCart"
        :products="filteredProducts"
        :filters="state.filters"

      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
      class="cart b3"
    />
    <TheFooter class="footer b4" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss' as *;
@use './assets/scss/debug.scss' as *;

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    'header header'
    'shop cart'
    'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;

  .header {
    grid-area: header;
  }
  .shop {
    grid-area: shop;
  }
  .cart {
    grid-area: cart;
    border-left: var(--border);
    background-color: white;
  }
  .footer {
    grid-area: footer;
  }
}

.gridEmpty {
  grid-template-areas:
    'header'
    'shop'
    'footer';
  grid-template-columns: 100%;
}

@media (max-width: 768px) {
  .app-container {
    grid-template-areas:
      'header'
      'shop'
      'cart'
      'footer';
    grid-template-columns: 1fr;
    grid-template-rows: 48px auto auto 48px;
  }

  .cart {
    border-left: none;
    border-top: var(--border);
  }
}
</style>

