<script setup lang="ts">
import {
  useFetchProducts,
  deleteProduct,
} from '../../../shared/services/product.service'

const { products, loading, error } = useFetchProducts()

const tryDeleteProduct = async (productId: string) => {
  await deleteProduct(productId)
  products.value = products.value!.filter(p => p._id !== productId)
}
</script>

<template>
  <div class="container card">
    <h1>Product List</h1>
    <h3 v-if="error">Oops an error</h3>
    <h3 v-else-if="loading">Loading...</h3>
    <ul v-else>
      <li
        class="d-flex flex-row align-items-center"
        v-for="product of products"
        :key="product._id"
      >
        <span class="flex-fill">{{ product.title }}</span>
        <button class="btn btn-primary mr-20">Edit</button>
        <button @click="tryDeleteProduct(product._id)" class="btn btn-danger">
          Cancel
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
}

li {
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 5px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: var(--gray-1);
  }
}
</style>
