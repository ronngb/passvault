<template>
  <div id="app">
    <header class="header-search">
      <SearchItem />
    </header>
    <aside class="aside-list">
      <AccountList />
    </aside>
    <router-view />
    <Toast />
  </div>
</template>
<script>
import SearchItem from './components/search/SearchItem.vue'
import AccountList from './components/sidebar/AccountList.vue'
import Toast from './components/toast/Toast.vue'

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountList,
    Toast,
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
