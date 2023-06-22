import * as vueRouter from 'vue-router';
import IrsChat from '@/components/IrsChat.vue';

const routes = [
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
