<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <Acctinfo></Acctinfo>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Acctinfo from "./components/Acctinfo.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
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
