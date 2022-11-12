<template>
  <div id="app" class="container">
    <header class="passvault-header">
      <SearchItem />
    </header>
    <aside class="passvault-aside">
      <AccountList />
    </aside>
    <main class="passvault-main">
      <router-view />
      <!-- <router-view :ref-modal="$refs.modalDialog" /> -->
      <!-- <ModalDialog ref="modalDialog" /> -->
    </main>
  </div>
</template>
<script>
import SearchItem from './components/search/SearchItem.vue'
import AccountList from './components/sidebar/AccountList.vue'

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountList,
  },
  created() {
    // TODO: use mapActions for clean look
    this.$store.dispatch('fetchAccounts')
  },
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
