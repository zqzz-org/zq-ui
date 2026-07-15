import { createRouter, createWebHistory } from 'vue-router'
import { defaultMobileKey } from '../config/playground-mobile'
import { defaultPcKey } from '../config/playground-pc'
import MobileLayout from '../layouts/MobileLayout.vue'
import PcLayout from '../layouts/PcLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: `/pc/${defaultPcKey}` },
    {
      path: '/pc',
      redirect: `/pc/${defaultPcKey}`,
    },
    {
      path: '/pc/:key',
      name: 'pc-demo',
      component: PcLayout,
    },
    {
      path: '/m',
      redirect: `/m/${defaultMobileKey}`,
    },
    {
      path: '/m/:key',
      name: 'm-demo',
      component: MobileLayout,
    },
  ],
})

export default router
