<script setup lang="ts">
import CartProduct from './CartProduct.vue'
import type { ProductInterface } from '../../interfaces/product.interface'

defineProps<{
  cart: ProductInterface[]
}>()
</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct v-for="product of cart" :product="product" :key="product.id" />
  </div>
</template>

<style lang="scss" scoped></style>
