import * as vueRouter from 'vue-router';
import IrsChatList from '@/components/IrsChatList.vue';
import IrsChat from '@/components/IrsChat.vue';

const routes = [
  {
    path: '/irs_chat_list',
    name: 'IrsChatList',
    component: IrsChatList,
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
