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
  moreResults: boolean
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
  (e: 'loadMore'): void
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
      class="flex-fill scrollable"
      :products="products"
      :more-results="moreResults"
      @add-product-to-cart="emit('addProductToCart', $event)"
      @load-more="emit('loadMore')"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
@media (max-width: 768px) {
  .shop-container {
    flex-direction: column;
  }
}
</style>
