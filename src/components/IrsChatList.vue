<template>
  <main class="wrapper">
    <div class="wrapper__main">
      <ul class="list-chat">
        <!-- グループ -->
        <li v-for="room in rooms" class="list-chat__item" :key="room.id">
          <a href="" class="list-chat__link" @click.prevent.stop="moveIrsChatPage(room.branchId,room.branchName)">
            <div class="list-chat__img"><img src="@/assets/img/img_group_sample.svg" alt="グループ画像"></div>
            <div class="list-chat__text">
              <div class="list-chat__name-time">
                <p class="list-chat__name">{{ room.branchName }}</p>
                <p class="list-chat__time">{{ formatSendAt(room.roomLastMessageUpdatedAt) }}</p>
              </div>
              <p class="list-chat__comment">{{ room.roomLastMessage }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { API, graphqlOperation } from '@aws-amplify/api';
import { listRooms, getMessage } from '@/graphql/queries';
import { ref, onBeforeUnmount, onUpdated } from 'vue';
import mixInCommon from '@/js/mixins/common'

export default {
  name: "IrsChatList",
  mixins: [mixInCommon],
  setup () {
    const rooms = ref([]);
    const fetch = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listRooms, { filter: {} ,limit: 100 }))
        rooms.value = response.data.listRooms.items.sort((a, b) => (a.branchId > b.branchId ? 1 : -1))
        for (const element of rooms.value) {
          let lastMessageUpdatedAt = ''
          let lastMessage = ''
          if (!element.roomLastMessageId) {
            // const getMessageResponse =   API.graphql(graphqlOperation(getMessage, { id: element.roomLastMessageId } ))
            // lastMessageUpdatedAt = getMessageResponse.data.getMessage.createdAt
            // lastMessage = getMessageResponse.data.getMessage.content
          }
          element.roomLastMessageUpdatedAt = lastMessageUpdatedAt
          element.roomLastMessage = lastMessage
        }
      } catch (error) {
        console.dir(error)
      }
    }

    fetch();
    return {
      rooms
    };
  },
  methods: {
    // チャットページへ遷移
    moveIrsChatPage(roomId, roomName) {
      this.$store.commit('room/setBranchId', roomId)
      this.$store.commit('room/setBranchName', roomName)
      this.$router.push({name: 'Irschat', params: {}})
    }
  }
}
</script>

<style scoped>

</style>