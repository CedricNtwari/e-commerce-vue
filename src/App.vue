<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import data from './data/products'
import { reactive } from 'vue'
import type { ProductInterface, ProductCartInterface } from './interfaces/index'

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
}>({
  products: data,
  cart: [],
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
  if (productFromCart?.quantity === 1) {
    state.cart = state.cart.filter(product => product.id !== productId)
  } else {
    productFromCart.quantity--
  }
}
</script>

<template>
  <div class="app-container">
    <TheHeader class="header b1" />
    <Shop
      :products="state.products"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <Cart
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
      class="cart b3"
    />
    <TheFooter class="footer b4" />
  </div>
</template>

<style lang="scss">
@use './assets/base.scss' as *;
@use './assets/debug.scss' as *;

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

