<template>
  <div id="app">
    <header class="header-search">
      <SearchItem />
    </header>
    <aside class="aside-list">
      <AccountList />
    </aside>
    <main class="main-content">
      <router-view />
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
    // TODO: use mapActions
    this.$store.dispatch('fetchAccounts')
  },
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
