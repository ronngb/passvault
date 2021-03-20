<template>
  <main id="acct-main" class="col-md-7 ">
    <!-- <AccountInfo /> -->
    <AccountNew v-if="isBool" />
  </main>
</template>
<!-- eslint-disable -->
<script>
import AccountInfo from "./AccountInfo.vue";
import AccountNew from "./AccountNew.vue";
import { store } from "../store.js";

export default {
  name: "AccountMain",
  data() {
    return {
      acctLists: store.state.acctData,
      isBool: ''
    }
  },
  components: {
    AccountInfo,
    AccountNew,
  },
  created() {
    this.$EventBus.$on('createAcct', event => this.addNote(event));
  },
  mounted() {
    if (this.acctLists.length == 0) {
      //make acctnew true
      this.isBool = true;
    }

  },
};
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}
</style>
