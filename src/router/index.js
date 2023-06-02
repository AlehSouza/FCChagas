import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/novo-cliente',
    name: 'cliente',
    component: () => import('../views/NovoClienteView.vue')
  },
  {
    path: '/detalhes-cliente/:id',
    name: 'cliente',
    component: () => import('../views/DetalhesCliente.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
