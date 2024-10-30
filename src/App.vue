<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
</script>

<template>
  <div class="app-container">
    <TheHeader class="header b1" />
    <Shop class="shop" />
    <Cart class="cart b3" />
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

  // Styles for desktop
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

// Media query for responsive layout
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
