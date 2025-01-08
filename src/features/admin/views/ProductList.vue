<script setup lang="ts">
import { useAdminProductStore } from '../stores/AdminProductStore'

const adminProductStore = useAdminProductStore()
adminProductStore.fetchProducts()

function tryDeleteProduct(productId: string) {
  adminProductStore.tryDeleteProduct(productId)
}
</script>

<template>
  <div class="container card">
    <h1>Product List</h1>

    <h3 v-if="adminProductStore.isLoading">Loading...</h3>
    <ul v-else>
      <li
        class="d-flex flex-row align-items-center"
        v-for="product of adminProductStore.products"
        :key="product._id"
      >
        <span class="flex-fill">{{ product.title }}</span>
        <router-link :to="{ name: 'edit', params: { productId: product._id } }">
          <button class="btn btn-primary mr-20">Edit</button>
        </router-link>
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
