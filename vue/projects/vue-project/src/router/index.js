import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import toDoListView1 from "../views/ToDoListView1.vue";
import ToDoListView2 from "../views/ToDoListView2.vue";

import FetchViewV1 from "../views/FetchViewV1.vue";
import FetchViewV2 from "../views/FetchViewV2.vue";

import FormView from "../views/FormView.vue";
import WatchView from "../views/WatchView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:
        [
            {
                path: '/',
                name: 'home',
                component: HomeView
            },
            {
                path: '/todo-v1',
                name: 'todo-v1',
                component: toDoListView1
            },
            {
                path: '/todo-v2',
                name: 'todo-v2',
                component: ToDoListView2
            },
            {
                path: '/fetch-v1',
                name: 'fetch-v1',
                component: FetchViewV1
            },
            {
                path: '/fetch-v2',
                name: 'fetch-v2',
                component: FetchViewV2
            },

            {
                path: '/form',
                name: 'form',
                component: FormView
            },
            {
                path: '/watch',
                name: 'watch',
                component: WatchView
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/AboutView.vue')
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
            }]
})

export default router
