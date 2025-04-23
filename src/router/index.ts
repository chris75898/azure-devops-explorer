import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useConfigStore } from '../stores/config';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('../views/ExplorerVue.vue'),
      meta: { requiresConfig: true }
    }, {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/SetupView.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  const configStore = useConfigStore();

  if (to.meta.requiresConfig && !configStore.areRequiredAttributesSet) {
    next({ name: 'setup' });
  } else {
    next();
  }
});

export default router
