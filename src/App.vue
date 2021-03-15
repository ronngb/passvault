<template>
  <div id="app">
    <SearchBar />
    <div class="container-fluid">
      <div class="row">
        <AccountList />
        <AccountInfo />
        <!-- <AccountNew /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import AccountList from "./components/AccountList.vue";
import AccountInfo from "./components/AccountInfo.vue";
// import AccountNew from "./components/AccountNew.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    AccountList,
    // AccountNew,
    AccountInfo,
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
