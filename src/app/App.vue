<template>
  <div id="app">
    <SearchItem />
    <div class="container-fluid">
      <AccountMain />
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import SearchItem from './components/search/SearchItem.vue';
import AccountMain from './components/AccountMain.vue';

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountMain,
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
