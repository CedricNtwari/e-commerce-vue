<script setup lang="ts">
import ShopProduct from './ShopProduct.vue'
import type { ProductInterface } from '../../interfaces'

defineProps<{ products: ProductInterface[] }>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
}>()
</script>

<template>
  <div class="grid p-20">
    <ShopProduct
      @add-product-to-cart="emit('addProductToCart', $event)"
      v-for="product in products"
      :product="product"
      :key="product.id"
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
