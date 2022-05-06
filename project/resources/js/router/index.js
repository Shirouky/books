import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { store } from "../store"

const ifAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("token") || store.state.token;
  if (token == "") {
    next("/login");
  } else {
    axios
      .get("/api/check-user")
      .then(() => {
        next();
        return
      })
      .catch(() => {
        console.log("sada")
        next("/login");
      });
  }
}

const ifNotAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("token") || store.state.token;
  if (token == "" || token) {
    next("/login");
  } else {
    next("/")
  }
}
const ifAdmin = (to, from, next) => {
  let token = localStorage.getItem("token") || store.state.token;
  if (token == "") {
    next("/login");
  } else {
    axios
      .get("/api/check-admin")
      .then(() => {
        next();
      })
      .catch(() => {
        console.log("asd")
        next("/login");
      });
  }
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
  }, {
    path: '/register',
    name: 'register',
    component: RegisterView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
