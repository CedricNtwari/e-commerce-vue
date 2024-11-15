<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Boutique from './features/boutique/Boutique.vue'
import Admin from './features/admin/Admin.vue'
import { reactive, type Component } from 'vue'
import type { Page } from '@/interfaces'
// import { seed, seed40Products } from './data/seed'

const state = reactive<{
  page: Page
}>({
  page: 'Boutique',
})

const pages: { [s: string]: Component } = {
  Boutique,
  Admin,
}

const navigate = (page: Page): void => {
  state.page = page
}

//seed('projetproducts')
//seed40Products('projetproducts')
</script>

<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" :page="state.page" class="header b1" />
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <TheFooter class="footer b4" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss' as *;
@use './assets/scss/debug.scss' as *;

.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas:
    'header'
    'app-content'
    'footer';

  grid-template-rows: 48px auto 48px;

  .header {
    grid-area: header;
  }
  .app-content {
    grid-area: app-content;
  }

  .footer {
    grid-area: footer;
  }
}

.gridEmpty {
  grid-template-areas:
    'header'
    'app-content'
    'footer';
  grid-template-columns: 100%;
}

@media (max-width: 768px) {
  .app-container {
    grid-template-areas:
      'header'
      'app-content'
      'footer';
    grid-template-columns: 1fr;
  }
}
</style>
