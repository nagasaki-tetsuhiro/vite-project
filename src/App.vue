<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <main>
        <Header />
        <section>
          <router-view :username="user.username" />
        </section>
      </main>
      <Footer />
    </template>
  </authenticator>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import '@/assets/base.css';
@import '@/assets/css/app.css';
</style>

