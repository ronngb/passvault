<template>
  <main id="acct-main" class="col-md-7 ">
    <!-- TODO:Try adding props here -->
    <AccountInfo v-if="!isBool" :info="acctInfo" />
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
    //THIS PART:ERROR
    this.$EventBus.$on('createAcct', () => this.isBool = true);
    this.$EventBus.$on('setIndex', index => {
      this.shiftView()
      this.getAcctInfo(index)
    });
  },
  mounted() {
    this.acctList.acctData.length == 0 ? this.isBool = true : null
  },
  methods: {
    shiftView() {
      this.isBool = false
    },
    getAcctInfo(index) {
      //TODO:Refactor
      this.acctInfo = this.acctList.acctData[index]
    }
  }
};
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}
</style>
