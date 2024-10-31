<script setup lang="ts">
import ShopProduct from './ShopProduct.vue'
import type { ProductInterface } from '../../interfaces/product.interface'

defineProps<{ products: ProductInterface[] }>()
</script>

<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product in products"
      :product="product"
      :key="product.title"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 300px;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
</style>
