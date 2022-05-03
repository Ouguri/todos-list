import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      { path: 'echart', component: () => import('../views/Echart.vue') },
      { path: 'todos', component: () => import('../views/Todos/index.vue') }
    ]
  },

  // 重定向
  {
    path: '',
    redirect: '/home/todos'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
