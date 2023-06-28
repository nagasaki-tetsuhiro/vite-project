<template>
  <p class="navigation">
    <router-link
        class="navigation__link icon--prev"
        :to="{name: 'IrsChatList'}">{{ roomName }}
    </router-link>
  </p>
  <main class="wrapper">
    <div class="wrapper__main wrapper__chat">
      <div v-for="message in messages" :key="message.id">
        <!-- 自分以外が送信したのメッセージ -->
        <div v-if="message.owner !== username" class="chat__content chat__left">
          <p class="chat__name">{{ message.owner }}</p>
          <p class="chat__text">{{ message.content }}</p>
          <p class="chat__date">{{ message.createdAt }}</p>
        </div>
        <!-- 自分が送信したメッセージ -->
        <div v-if="message.owner === username" class="chat__content chat__right">
          <p class="chat__text">{{ message.content }}</p>
          <p class="chat__date">{{ message.createdAt }}</p>
        </div>
      </div>

      <div class="chat__input">
        <form class="form-wrap">
          <a href="#" class="btn">
            <img src="@/assets/img/icon_camera.svg" alt="" width="20" height="18">
          </a>
          <a href="#" class="btn">
            <img src="@/assets/img/icon_img.svg" alt="" width="18" height="18">
          </a>
          <div class="input__wrap">
            <input
                type="text"
                v-model="content"
                placeholder="メッセージを入力"
            >
          </div>
          <a class="btn" @click.prevent.stop="sendMessage">
            <img src="@/assets/img/btn_send.svg" alt="送信" width="40" height="40">
          </a>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { API, graphqlOperation } from '@aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { createMessage } from '@/graphql/mutations';
import { listMessages } from '@/graphql/queries';
import { onCreateMessage } from '@/graphql/subscriptions';
import { ref, onBeforeUnmount, onUpdated } from 'vue';
import Footer from '@/components/Footer.vue'

export default {
  props: {
    username: String,
    branchId: String,
    branchName: String,
  },
  components: {
    Footer
  },
  setup(props) {
    const messages = ref([]);
    const content = ref('');
    const subscription = ref({});

    const roomName = ref('TEST1');

    const sendMessage = async () => {
      if (!content.value){
        return
      }
      const message = {
        id: new Date().getTime() + props.username,
        content: content.value,
      };

      // Mutation(createMessage) の実装 ↓
      API.graphql(graphqlOperation(createMessage, { input: message })).catch((error) => console.warn(error));
      // ↑↑↑↑↑↑
      content.value = '';
    };

    const fetch = async () => {
      // Query(listMessages) の実装 ↓
      API.graphql(graphqlOperation(listMessages, { input: 100 }))
          .then((value) => (messages.value = value.data.listMessages.items.sort((a, b) => (a.id > b.id ? 1 : -1))))
          .catch((error) => console.warn(error));
      // ↑↑↑↑↑↑
    };

    const subscribe = async () => {
      // Subscription(onCreateMessages) の実装 1 ↓
      subscription.value = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
        next: (eventData) => {
          const message = eventData.value.data.onCreateMessage;
          messages.value = [...messages.value, message];
        },
        error: (error) => console.warn(error),
      });
      // ↑↑↑↑↑↑
    };

    const scrollBottom = () => {
      const container = document.querySelector('.wrapper__chat');
      container.scrollTop = container.scrollHeight;
    };

    onBeforeUnmount(() => {
      // Subscription(onCreateMessages) の実装 2 ↓
      subscription.value.unsubscribe();
      // ↑↑↑↑↑↑
    });

    onUpdated(() => {
      scrollBottom();
    });

    fetch();
    subscribe();

    return {
      messages,
      content,
      sendMessage,
      roomName,
    };
  },
};
</script>
