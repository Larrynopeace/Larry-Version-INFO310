// This is the router file for the Vue 3 application.
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'
import Home from '@/pages/Home.vue'
import User from '@/pages/User.vue'
import Login from '@/pages/Login.vue'
import Chart from '@/pages/Chart.vue'
import Gauge from '@/pages/Gauge.vue'
import TestData from '@/pages/TestData.vue'
import Signup from '@/pages/Signup.vue'
import SonToFather from '@/pages/SonToFather.vue'
import { store } from '@/store/store'

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: { requiresAuth: true }, 
        // The 'meta' property is used to protect the routes that require authentication.
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: { requiresAuth: true }
            },
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: { requiresAuth: true }
            },
            {
                path: '/chart',
                name: 'Chart',
                component: Chart,
                meta: { requiresAuth: true }
            },
            {
                path: '/gauge',
                name: 'Gauge',
                component: Gauge,
                meta: { requiresAuth: true}
            },
            {
                path: '/test',
                name: 'Test',
                component: TestData,
                meta: { requiresAuth: true}
            },
            {
                path: '/son-to-father',
                name: 'SonToFather',
                component: SonToFather,
                meta: { requiresAuth: true}
            }   
        ]
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
    }
]

// This is the router instance.
const router = createRouter({
    history: createWebHistory(),
    routes
})

// This navigation guard is used to protect routes that require authentication.
router.beforeEach((to, from, next) => {
    const userStore = store()
    if (to.meta.requiresAuth && !userStore.token) {
      next({ path: '/login'})
    } else {
      next()
    }
  })

export default router