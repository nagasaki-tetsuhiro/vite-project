<template>
  <header class="header">
    <div class="logo">
      <a href="/"><img src="@/assets/img/logo.png" alt="イリーゼアーチ"></a>
    </div>
    <nav class="nav">
      <ul class="list">
        <li><router-link class="routerLink" to="/irs_chat_list">Chat_List</router-link></li>
      </ul>
    </nav>
    <!-- 追加 2 -->
    <button @click="signOut" class="contact">Sign out</button>
  </header>
</template>
<script>
export default {
  name: "Header",
  props: {
    signOut: Object,
  },
}
</script>

<style scoped>

</style>