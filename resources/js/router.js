import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './components/DashboardComponent'
import Users from './components/UsersComponent'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/users', name: 'users', component: Users }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
