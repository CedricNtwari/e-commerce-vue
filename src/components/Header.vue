<template>
  <header class="header-container">
    <a href="#" class="logo-container">
      <img src="../assets/logo.svg" alt="Logo" />
      <span class="logo">Electronica AG</span>
    </a>
    <button
      v-if="isMobile"
      @click="isMenuOpen = !isMenuOpen"
      class="burger-menu"
    >
      ☰
    </button>

    <!-- Navigation Links -->
    <nav
      :class="{
        'menu-mobile': isMobile,
        'menu-desktop': !isMobile,
        show: isMobile && isMenuOpen,
      }"
    >
      <ul class="d-flex flex-row left-links">
        <li>
          <a
            :class="{ active: page === 'Boutique' }"
            @click="emit('navigate', 'Boutique')"
            class="px-10"
            >Boutique</a
          >
        </li>
        <li>
          <a
            :class="{ active: page === 'Admin' }"
            @click="emit('navigate', 'Admin')"
            class="px-10"
            >Admin</a
          >
        </li>
      </ul>
      <ul class="d-flex flex-row right-links">
        <li><a class="px-10" href="#">Register</a></li>
        <li><a class="px-10" href="#">Log In</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { Page } from '@/interfaces'
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  page: Page
}>()

const emit = defineEmits<{
  (e: 'navigate', page: Page): void
}>()

const isMenuOpen = ref<boolean>(false)

const isMobile = ref<boolean>(window.innerWidth < 768)

const updateIsMobile = (): void => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--primary-1);
}

.logo-container {
  display: flex;
  align-items: center;
  color: var(--text-primary-color);

  img {
    width: 20px;
    margin-right: 5px;
  }

  .logo {
    font-weight: 700;
    font-size: 20px;
  }
}

.burger-menu {
  background: none;
  border: none;
  color: var(--text-primary-color);
  font-size: 24px;
  cursor: pointer;
  display: none;
}

.menu-mobile {
  display: none;
}

.menu-mobile.show {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 31px;
  left: 0;
  right: 0;
  background-color: var(--primary-1);
  padding: 10px 0;
  z-index: 1;
}

.menu-desktop {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}

.left-links {
  display: flex;
  flex-grow: 1;
}

.right-links {
  display: flex;
  justify-content: flex-end;
}

li a {
  color: var(--text-primary-color);
}

.active {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .burger-menu {
    display: inline;
  }

  .menu-desktop {
    display: none;
  }

  .menu-mobile {
    display: none;
  }

  .menu-mobile.show {
    display: flex;
  }
}
</style>
