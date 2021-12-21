<template>
  <div id="app">
    <header>
      <SearchItem />
    </header>
    <main class="main-passvault">
      <AccountList />
      <!-- <AccountMain /> -->
      <Information />
    </main>
  </div>
</template>
<script>
import SearchItem from './components/search/SearchItem.vue';
import Information from './components/information/Information.vue';
import AccountList from './components/sidebar/AccountList.vue';

export default {
  name: 'App',
  components: {
    SearchItem,
    Information,
    AccountList,
  },
  created() {
    this.$store.dispatch('loadData');
  },
};
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
</style>
