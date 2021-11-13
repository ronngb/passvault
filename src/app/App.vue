<template>
  <div id="app">
    <header>
      <SearchItem />
    </header>
    <main class="container-fluid">
      <AccountList> </AccountList>
      <!-- <AccountMain /> -->
    </main>
  </div>
</template>
<!-- eslint-disable -->
<script>
import SearchItem from './components/search/SearchItem.vue';
import AccountMain from './components/AccountMain.vue';
import AccountList from './components/account/AccountList.vue';

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountMain,
    AccountList,
  },
};
</script>

<style>
#app {
  font-family: SF Pro Display;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
