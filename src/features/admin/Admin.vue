<script setup lang="ts">
import AdminNav from './components/AdminNav.vue'
</script>

<template>
  <div class="admin-container d-flex flex-row p-20">
    <AdminNav class="admin-nav" />
    <div
      class="admin-main flex-fill d-flex flex-row justify-content-center align-items-center"
    >
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/mixins' as *;
.admin-container {
  height: 100%;

  @include xs {
    flex-direction: column;
  }
}

.admin-nav {
  margin-right: 20px;
  flex: 0 0 200px;

  @include xs {
    margin-right: 0;
    margin-bottom: 10px;
    flex: none;
  }
}
</style>
