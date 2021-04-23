<template>
  <main id="acct-main" class="col-md-7 ">
    <!-- TODO:Try adding props here -->
    <AccountInfo v-if="!isBool" :info="acctInfo"
                 :info-pass="acctInfo.password" />
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
      acctList: store.state,
      acctInfo: '',
      isBool: ''
    }
  },
  components: {
    AccountInfo,
    AccountNew,
  },
  created() {
    this.$EventBus.$on('createAcct', () => this.isBool = true);
    this.$EventBus.$on('setIndex', index => {
      this.acctInfo = this.acctList.acctData[index]
      this.isBool = false
    });
  },
  mounted() {
    this.hasAcct()
  },
  methods: {
    hasAcct() {
      this.acctList.acctData.length == 0 ?
        this.isBool = true : this.acctInfo = this.acctList.acctData[0]

    }
  }
};
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}
</style>
