<script setup lang="ts">
import type { Category, FiltersInterface, FilterUpdate } from '@/interfaces'

defineProps<{
  filters: FiltersInterface
  productResults: number
}>()

const emits = defineEmits<{
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()
</script>

<template>
  <div class="p-20 d-flex flex-column">
    <section class="mb-20">
      <h3 class="mb-10">Search</h3>
      <input
        :value="filters.search"
        @input="
          emits('updateFilter', {
            search: ($event.target as HTMLInputElement).value,
          })
        "
        type="text"
        placeholder="Search..."
      />
    </section>
    <section class="mb-20">
      <h3 class="mb-10">Sort by price</h3>
      <div
        class="mb-5"
        v-for="priceRange of [
          [0, 10000],
          [800, 1000],
          [1000, 1500],
          [1500, 2000],
          [2000, 10000],
        ] as [number, number][]"
        :key="priceRange + ''"
      >
        <input
          type="radio"
          name="priceRange"
          :id="priceRange[0] + ''"
          :checked="
            filters.priceRange[0] === priceRange[0] &&
            filters.priceRange[1] === priceRange[1]
          "
          @input="emits('updateFilter', { priceRange })"
        />
        <label :for="priceRange[0].toString()">
          {{
            priceRange[0] === 0
              ? 'All price'
              : priceRange[0] === 2000
                ? 'More than 2000€'
                : `${priceRange[0]}€ - ${priceRange[1]}€`
          }}
        </label>
      </div>
    </section>
    <section class="mb-20 flex-fill">
      <h3 class="mb-10">Sort by category</h3>
      <p
        class="category"
        :class="{ selected: filters.category === category }"
        v-for="category in [
          'all',
          'desktop',
          'gamer',
          'streaming',
        ] as Category[]"
        :key="category"
        @click="emits('updateFilter', { category })"
      >
        {{ category }}
      </p>
    </section>
    <small class="mb-10"
      ><strong> {{ productResults }}</strong> Results</small
    >
    <button class="btn btn-danger" @click="emits('updateFilter', {})">
      Clear filters
    </button>
  </div>
</template>

<style lang="scss" scoped>
.category {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
