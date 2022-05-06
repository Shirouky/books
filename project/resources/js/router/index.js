import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
// import store from "../store"

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

// const ifAdmin = (to, from, next) => {
//   if (store.getters.isAdmin) {
//     next()
//     return
//   }
//   next('/admin')
// }

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
    return
  }
  next('/login')
}

const ifAdmin = (to, from, next) => {
  if (localStorage.getItem('is_admin') == "true") {
    next()
    return
  }
  next('/login')
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
