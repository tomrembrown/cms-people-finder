import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "aboutpage" */ '@/views/AboutPage.vue'),
  },
  {
    path: '/myprofile',
    name: 'My Profile Page',
    component: () =>
      import(
        /* webpackChunkName: "myprofilepage" */ '@/views/MyProfilePage.vue'
      ),
  },
  {
    path: '/:catchAll(.*)',
    component: () =>
      import(/* webpackChunkName: "notfoundpage" */ '@/views/NotFoundPage.vue'),
    name: 'NotFound',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
