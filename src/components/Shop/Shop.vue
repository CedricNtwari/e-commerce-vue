<script setup lang="ts">
import ShopProductList from './ShopProductList.vue'
import ShopFilters from './ShopFilters.vue'
import type {
  ProductInterface,
  FilterUpdate,
  FiltersInterface,
} from '@/interfaces'

defineProps<{
  products: ProductInterface[]
  filters: FiltersInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()
</script>

<template>
  <div class="shop-container d-flex flex-row">
    <ShopFilters
      :filters="filters"
      :productResults="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <ShopProductList
      class="flex-fill"
      :products="products"
      @add-product-to-cart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}
@media (max-width: 768px) {
  .shop-container {
    flex-direction: column;
  }
}
</style>
