<script setup lang="ts">
import type { ProductInterface } from '@/shared/interfaces'

defineProps<{
  product: ProductInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
}>()
</script>

<template>
  <div class="product d-flex flex-column">
    <div
      class="product-image"
      :style="{
        backgroundImage: product.image
          ? `url(${product.image})`
          : 'url(https://media.ldlc.com/r1600/ld/products/00/05/82/01/LD0005820198_1.jpg)',
      }"
    ></div>
    <div class="p-10 d-flex flex-column">
      <h4>{{ product.title }}</h4>
      <p>{{ product.description }}1</p>
      <div class="d-flex flex-row align-items-center">
        <strong class="flex-fill">{{ product.price }}€</strong>
        <button
          class="btn btn-primary"
          @click="emit('addProductToCart', product._id)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  background-color: #ffffff;
  border: var(--border);
  border-radius: var(--border-radius);
  &-image {
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 250px;
  }
}
</style>
