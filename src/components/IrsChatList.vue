<template>
  <main class="wrapper">
    <div class="wrapper__main">
      <ul class="list-chat">
        <!-- グループ -->
        <li v-for="room in rooms" class="list-chat__item" :key="room.id">
          <a href="" class="list-chat__link" @click.prevent.stop="moveIrsChatPage(room.id,room.branchName)">
            <div class="list-chat__img"><img src="@/assets/img/img_group_sample.svg" alt="グループ画像"></div>
            <div class="list-chat__text">
              <div class="list-chat__name-time">
                <p class="list-chat__name">{{ room.branchName }}</p>
                <p class="list-chat__time">{{ room.updatedAt }}</p>
              </div>
              <p class="list-chat__comment">test本日のミーティングは開催場所が第１本日のミーティングは開催場所が第１本日テストテストテストテスト</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import {API, graphqlOperation} from "@aws-amplify/api";
import {listRooms} from '@/graphql/queries';
import { ref, onBeforeUnmount, onUpdated } from 'vue';

export default {
  name: "IrsChatList",
  setup () {
    const rooms = ref([]);
    const fetch = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listRooms, { filter: {} ,limit: 100 }))
        rooms.value = response.data.listRooms.items.sort((a, b) => (a.branchId > b.branchId ? 1 : -1))
      } catch (error) {
        console.dir(error)
      }
    }

    fetch();
    return {
      rooms,
    };
  },
  methods: {
    // チャットページへ遷移
    moveIrsChatPage (roomId, roomName) {
      this.$store.commit('room/setRoomId', roomId)
      this.$store.commit('room/setRoomName', roomName)
      this.$router.push({ name: 'Irschat', params: { }})
    }
  }
}
</script>

<style scoped>

</style>