<template>
  <main id="acct-main" class="col-md-7 ">
    <!-- TODO:Try adding props here -->
    <AccountInfo v-if="!isBool" />
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
    //this.$EventBus.$on('createAcct', event => console.log(event));
    this.$EventBus.$on('setIndex', index => {
      this.shiftView()
      this.getAcctInfo(index)
    });
  },
  mounted() {
    if (this.acctList.acctData.length == 0) {
      //make acctnew true
      this.isBool = true;
    }
  },
  methods: {
    shiftView() {
      this.isBool = !this.isBool
    },
    getAcctInfo(index) {
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
