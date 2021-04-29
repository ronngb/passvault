<template>
  <div id="app">
    <SearchBar />
    <div class="container-fluid">
      <AccountMain />
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import SearchBar from "./components/SearchBar.vue";
import AccountMain from "./components/AccountMain.vue";

export default {
  name: "App",
  components: {
    SearchBar,
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
