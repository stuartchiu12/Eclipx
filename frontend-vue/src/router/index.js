import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "about" */ '../views/Map.vue'),
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('jwt')) {
        this.$router.push('')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
