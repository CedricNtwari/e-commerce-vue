<script setup lang="ts">
import CartProductList from './CartProductList.vue'
import type { ProductCartInterface } from '../../interfaces/index'
import { computed } from 'vue'

const props = defineProps<{
  cart: ProductCartInterface[]
}>()

const totalPrice = computed(() =>
  props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)
)

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void
}>()
</script>

<template>
  <div class="p-20 d-flex flex-column">
    <h2 class="mb-10">Cart</h2>
    <CartProductList
      class="flex-fill"
      :cart="props.cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button class="btn btn-sucess">Order {{ totalPrice }}€</button>
  </div>
</template>

<style lang="scss" scoped></style>
