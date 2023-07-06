<template>
  <p class="navigation">
    <router-link
        class="navigation__link icon--prev"
        :to="{name: 'IrsChatList'}">{{ branchName }}
    </router-link>
  </p>
  <main class="wrapper">
    <div class="wrapper__main wrapper__chat">
      <div v-for="message in messages" :key="message.id">
        <!-- 自分以外が送信したのメッセージ -->
        <div v-if="message.owner !== username" class="chat__content chat__left">
          <p class="chat__name">{{ message.owner }}</p>
          <p class="chat__text">{{ message.content }}</p>
          <p class="chat__date">{{ formatSendAt(message.createdAt) }}</p>
        </div>
        <!-- 自分が送信したメッセージ -->
        <div v-if="message.owner === username" class="chat__content chat__right">
          <p class="chat__text">{{ message.content }}</p>
          <p class="chat__date">{{ formatSendAt(message.createdAt) }}</p>
        </div>
      </div>

      <div class="chat__input">
        <form class="form-wrap">
          <a href="#" class="btn">
            <img src="@/assets/img/icon_camera.svg" alt="" width="20" height="18">
          </a>
          <!--
          <a href="#" class="btn">
            <img src="@/assets/img/icon_img.svg" alt="" width="18" height="18">
          </a> -->
          <label id="file_select_label">
            <span class="btn" title="">
              <img src="@/assets/img/icon_img.svg" alt="" width="18" height="18">
            </span>
            <input
                type="file"
                name="datafile"
                id="file_select"
                @change="selectFile"
            >
          </label>
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


<style>
#file_select_label {
  width: 10%;
}

input[type="file"] {
  display: none;
}
</style>


<script>
import { API, graphqlOperation } from '@aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { createMessage, updateRoom } from '@/graphql/mutations';
import { listMessages } from '@/graphql/queries';
import { onCreateMessage } from '@/graphql/subscriptions';
import { ref, onBeforeUnmount, onUpdated } from 'vue';
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'
import mixInCommon from '@/js/mixins/common'

export default {
  props: {
    username: String,
  },
  mixins: [mixInCommon],
  components: {
    Footer
  },
  setup(props) {
    const messages = ref([]);
    const content = ref('');
    const subscription = ref({});
    const store = useStore()

    const roomId = store.getters["room/getId"]
    const branchId = store.getters["room/getBranchId"]
    const branchName = store.getters["room/getBranchName"]

    const sendMessage = async () => {
      if (!content.value){
        return
      }
      const message = {
        content: content.value,
        roomId: branchId,
        userId: props.username,
        type: 1,
        userName: props.username,
        imageUrl: null,
        imageS3Key: null,
      };

      const room = {
        id: roomId,
        roomLastMessageId: null
      }

      try {
        const createResponse =  await API.graphql(graphqlOperation(createMessage, { input: message }))
        room.roomLastMessageId = createResponse.data.createMessage.id
        const updateRoomResponse = await API.graphql(graphqlOperation(updateRoom, { input: room }))
        content.value = '';
      } catch (error) {
        console.dir(error)
      }
    };

    const fetch = async () => {
      try {
        const listMessageResponse = await API.graphql(graphqlOperation(listMessages, { filter: {roomId: {eq:branchId}} }))
        messages.value = listMessageResponse.data.listMessages.items.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      } catch (error) {
        console.dir(error)
      }
    };

    const subscribe = async () => {
      subscription.value = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
        next: (eventData) => {
          const message = eventData.value.data.onCreateMessage;
          messages.value = [...messages.value, message];
        },
        error: (error) => console.warn(error),
      });
    };

    const scrollBottom = () => {
      const container = document.querySelector('.wrapper__chat');
      container.scrollTop = container.scrollHeight;
    };

    onBeforeUnmount(() => {
      subscription.value.unsubscribe();
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
      branchName,
    };
  },
  methods: {
    selectFile (event, key = '', image = {}) {
      console.dir('aaaaa')
      console.dir(event)
      console.dir(key)
      console.dir(image)
      // this.isDrag = null; //★ドラッグ中のクラスを外しておく。
      let fileList = event.target.files ? event.target.files : event.dataTransfer.files; //★①ファイル取得

      console.dir('fileList')
      console.dir(fileList)

      // ファイルが無い時は処理を中止
      if(fileList.length == 0){
        return false
      }
      let files    = [];
      for(let i = 0; i < fileList.length; i++){
        files.push(fileList[i])
      }
      // 今回は1ファイルのみ送ることにする。
      let file = files.length > 0 ? files[0] : [];
      let fd   = new FormData(); //★②
      fd.append('file', file);
      console.dir(fd)
    }
  }
};
</script>
