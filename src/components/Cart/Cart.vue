<script setup lang="ts">
import CartProductList from './CartProductList.vue'
import type { ProductInterface } from '../../interfaces/product.interface'

defineProps<{
  cart: ProductInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void
}>()
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10">Cart</h2>
    <CartProductList
      :cart="cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
