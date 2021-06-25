import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/myprofile',
    name: 'My Profile',
    component: () =>
      import(/* webpackChunkName: "myprofile" */ '@/views/MyProfile.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue'),
    name: 'NotFound',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
