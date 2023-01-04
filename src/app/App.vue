<template>
  <div id="app">
    <header class="header-search">
      <SearchItem />
    </header>
    <aside v-if="isReady" class="aside-list">
      <AccountList />
    </aside>
    <router-view v-show="isReady" @ready="isReady = true" />
    <FetchLoading v-show="!isReady" />
    <Toast />
  </div>
</template>
<script>
import SearchItem from './components/search/SearchItem.vue'
import AccountList from './components/sidebar/AccountList.vue'
import FetchLoading from './components/loading/FetchLoading.vue'
import Toast from './components/toast/Toast.vue'
import NProgress from 'nprogress'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SearchItem,
    AccountList,
    FetchLoading,
    Toast,
  },
  data() {
    return {
      isReady: false,
    }
  },
  created() {
    NProgress.start()
    this.fetchAccounts().then(() => {
      setTimeout(() => {
        this.isReady = true
      }, 2000)
    })
  },
  watch: {
    isReady(val) {
      if (val) NProgress.done()
    },
  },
  methods: mapActions(['fetchAccounts']),
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
