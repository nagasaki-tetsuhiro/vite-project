import * as vueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import Chat from '@/components/Chat.vue';
import IrsChat from '@/components/IrsChat.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    props: true,
  },
  {
    path: '/irs_chat',
    name: 'Irschat',
    component: IrsChat,
    props: true,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
