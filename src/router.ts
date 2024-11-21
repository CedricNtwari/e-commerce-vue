import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './views/NotFound.vue'

export const router = createRouter({
  history: createWebHistory('/e-commerce-vue/'),
  routes: [
    {
      path: '/',
      redirect: '/boutique',
    },
    {
      path: '/boutique',
      component: () => import('@/features/boutique/Boutique.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/features/admin/Admin.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: NotFound,
    },
  ],
})
