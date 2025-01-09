import { createRouter, createWebHistory } from 'vue-router'
import { ADMIN_ROUTES } from './features/admin/admin.routes'
import NotFound from './views/NotFound.vue'
import { initialFetchProducts } from './features/boutique/stores/productStore'
import { initialFetchAdminProducts } from './features/admin/stores/AdminProductStore'

export const router = createRouter({
  history: createWebHistory('/e-commerce-vue/'),
  routes: [
    {
      path: '/',
      redirect: '/boutique',
    },
    {
      path: '/boutique',
      beforeEnter: [initialFetchProducts],
      component: () => import('@/features/boutique/Boutique.vue'),
    },
    {
      path: '/admin',
      beforeEnter: [initialFetchAdminProducts],
      component: () => import('@/features/admin/Admin.vue'),
      children: ADMIN_ROUTES,
    },
    {
      path: '/:notfound(.*)*',
      component: NotFound,
    },
  ],
})
