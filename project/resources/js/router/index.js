import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import { store } from "../store"

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.token) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.token) {
    next()
    return
  }
  next('/login')
}

const ifAdmin = (to, from, next) => {
  if (store.state.is_admin) {
    next()
    return
  }
  next('/admin')
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: ifAdmin,
  }
  , {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: ifNotAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
