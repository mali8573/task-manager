import { createRouter, createWebHistory } from 'vue-router'
import TaskManager from '../components/TaskManager.vue' // ייבוא הקומפוננטה הראשית

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskManager // הגדרת הקומפוננטה שתופיע בנתיב הראשי
    }
  ],
})

export default router