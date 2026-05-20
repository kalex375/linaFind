import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';
import AdminLevelEditor from '../views/AdminLevelEditor.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/level/:id', name: 'level', component: GameView },
    { path: '/admin/levels', name: 'admin-levels', component: AdminLevelEditor },
  ],
});
