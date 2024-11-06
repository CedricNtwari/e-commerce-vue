<script setup lang="ts">
import type { FiltersInterface, FilterUpdate } from '@/interfaces';

defineProps<{
   filters:FiltersInterface
}>()

const emits = defineEmits<{
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()

</script>

<template>
  <div class="p-20">
<section class="mb-20">
  <h3 class="mb-10">Search</h3>
  <input :value="filters.search" @input="emits('updateFilter', {search: ($event.target as HTMLInputElement).value })" type="text" placeholder="Search...">
</section>
  </div>

</template>

<style lang="scss" scoped></style>
