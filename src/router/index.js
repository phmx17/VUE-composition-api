import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/emitters',
    name: 'emitters',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Emitters.vue')
  },
  {
    path: '/books-table',
    name: 'books-table',
    component: () => import('../views/BooksTableView.vue')
  },
  {
    path: '/add-book',
    name: 'add-book',
    component: () => import('../views/AddBookView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/book-details',
    name: 'book-details',
    component: () => import('../views/BookDetailsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('../views/VuexView.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
