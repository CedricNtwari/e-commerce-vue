<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Boutique from './features/boutique/Boutique.vue'
</script>

<template>
  <div>
    <TheHeader class="header b1" />
    <div class="app-content">
      <Component :is="Boutique" />
    </div>
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
    'header'
    'app-content'
    'footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;

  .header {
    grid-area: header;
  }
  .app-content {
    grid-area: app-content;
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
