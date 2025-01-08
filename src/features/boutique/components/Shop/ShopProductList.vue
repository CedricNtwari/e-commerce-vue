<script setup lang="ts">
import { ref, watch } from 'vue'
import ShopProduct from './ShopProduct.vue'
import type { ProductInterface } from '@/shared/interfaces'

const props = defineProps<{
  products: ProductInterface[]
  page: number
  moreResults: boolean
}>()

const scrollableDiv = ref<HTMLDivElement | null>(null)

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
  (e: 'loadMore'): void
}>()

watch(
  () => props.page,
  () => {
    if (props.page === 1) {
      scrollableDiv.value?.scroll(0, 0)
    }
  },
)
</script>

<template>
  <div ref="scrollableDiv" class="d-flex flex-column p-20">
    <div class="grid mb-20">
      <ShopProduct
        @add-product-to-cart="emit('addProductToCart', $event)"
        v-for="product in products"
        :product="product"
        :key="product._id"
      />
    </div>
    <div
      v-if="moreResults && products.length"
      class="d-flex flex-row align-items-center justify-content-center"
    >
      <button @click="emit('loadMore')" class="btn btn-primary">
        Load more
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../../assets/scss/mixins' as m;

.grid {
  display: grid;
  grid-template-columns: 1fr;
  @include m.md {
    grid-template-columns: 1fr 1fr;
  }
  @include m.lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include m.xl {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
