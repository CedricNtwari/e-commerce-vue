<script setup lang="ts">
import type { ProductInterface } from '../../interfaces/product.interface'

defineProps<{
  product: ProductInterface
}>()
</script>

<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="flex-fill mr-10">{{ product.title }}</strong>
    <span class="mr-10">{{ product.price }}€</span>
    <button class="btn btn-danger">Supprimer</button>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--gray-1);
  display: flex;
  flex-wrap: wrap;

  strong,
  span,
  button {
    margin-bottom: 10px;
  }

  button {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .product {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-danger {
    align-self: flex-end;
  }
}
</style>
