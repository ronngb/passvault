<template>
  <div id="app">
    <SearchBar />
    <div class="container-fluid">
      <div class="row">
        <AccountList />
        <AccountMain />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import SearchBar from "./components/SearchBar.vue";
import AccountList from "./components/AccountList.vue";
import AccountMain from "./components/AccountMain.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    AccountList,
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
