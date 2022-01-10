<template>
  <div id="app">
    <header>
      <SearchItem />
    </header>
    <main class="main-passvault">
      <AccountList />
      <router-view id="acct-main" :ref-modal="$refs.modalDialog" />
      <ModalDialog ref="modalDialog" />
    </main>
  </div>
</template>
<script>
import SearchItem from './components/search/SearchItem.vue'
import AccountList from './components/sidebar/AccountList.vue'
import ModalDialog from './components/modal/ModalDialog.vue'

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountList,
    ModalDialog,
  },
  created() {
    this.$store.dispatch('loadData')
  },
}
</script>

<style scoped>
#app {
  font-family: SF Pro Display;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main-passvault {
  display: grid;
  grid-template-columns: 25% 1fr;
}

#acct-main {
  padding: 3rem 3rem;
}
</style>
