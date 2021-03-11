<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row">
        <Acctlist></Acctlist>
        <Acctinfo></Acctinfo>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Acctlist from "./components/Acctlist.vue";
import Acctinfo from "./components/Acctinfo.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Acctlist,
    Acctinfo,
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
