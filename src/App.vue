<template>
  <authenticator>
    <!-- 追加 1 -->
    <template v-slot="{ user, signOut }">
      <main>
        <header class="header">
          <div class="logo">
            <a href="/"><img src="/assets/img/logo.png" alt="イリーゼアーチ"></a>
          </div>
          <nav class="nav">
            <ul class="list">
              <li><router-link class="routerLink" to="/chat_list">Chat_List</router-link></li>
              <li><router-link class="routerLink" to="/chat">Chat</router-link></li>
              <li><router-link class="routerLink" to="/irs_chat">IRS_Chat</router-link></li>
            </ul>
          </nav>
          <!-- 追加 2 -->
          <button @click="signOut" class="contact">Sign out</button>
        </header>
        <section>
          <!-- 追加 3 -->
          <router-view :username="user.username" />
        </section>
      </main>
      <!-- 追加 4 -->
    </template>
  </authenticator>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/css/app.css';
</style>

