<template>
  <!-- TODO: add name class on every block element  -->
  <div id="app">
    <header class="pv-header">
      <SearchItem />
    </header>
    <aside class="pv-aside">
      <AccountList />
    </aside>
    <main class="pv-main">
      <router-view :ref-modal="$refs.modalDialog" />
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
    this.$store.dispatch('fetchData')
  },
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 20vh 80vh;
  column-gap: 16px;
  margin: 0 16px;
  height: 100%;
}
.pv-header {
  // display: flex;
  // justify-content: center;
  margin: auto 0;
  grid-column: 1 / -1;
}

.pv-aside {
  // max-width: 1100px;
  // min-width: 350px;
  // position: relative;
  // margin-left: 20px;
  left: 0;
  top: 20%;
  position: absolute;
  // background: $color-primary-bg;
  // border: 1px solid black;
  z-index: 10;
  height: calc(100vh - 20vh);
}

.pv-main {
  /*  display: grid;
  grid-template-columns: 25% 1fr;*/
  grid-column: 1 / -1;
  // width: 100%;
  /*border: 1px solid black;*/
}

@media screen and (min-width: 1200px) {
  #app {
    grid-template-columns: repeat(12, 1fr);
    column-gap: 24px;
    margin: 0 24px;
  }

  .pv-header {
    grid-column: 3 / 11;
  }

  .pv-aside {
    position: relative;
    top: 0;
    grid-column: 1 / 4;
    // border: 1px solid black;
  }

  .pv-main {
    grid-column: 4 / -1;
    // width: 100%;
  }
}
</style>
