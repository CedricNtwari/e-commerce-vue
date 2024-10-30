<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'

const currentYear: number = new Date().getFullYear()
const copyrightYear: ComputedRef<string> = computed(
  () => `2012 - ${currentYear}`
)
</script>

<template>
  <footer class="d-flex flex-row justify-content-center align-items-center">
    <p>Copyright ©{{ copyrightYear }} Electronica AG</p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--gray-3);
  color: var(--text-primary-color);
}
</style>
