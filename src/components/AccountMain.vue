<template>
  <main id="acct-main" class="col-md-7 ">
    <!-- TODO:Try adding props here -->
    <AccountInfo v-if="!isBool" :info="acctInfo" @update="updateInfo"
                 @fetch="hasAcct" />
    <AccountNew v-if="isBool" @update="hasAcct" />
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
      //TRY: make the acctInfo Object
      acctList: store.state,
      acctInfo: {},
      isBool: '',
    }
  },
  components: {
    AccountInfo,
    AccountNew,
  },
  created() {
    this.$EventBus.$on('createAcct', () => this.isBool = true);
    this.$EventBus.$on('setIndex', index => {
      this.acctInfo = JSON.parse(JSON.stringify(this.acctList.acctData[index]))
      this.isBool = false
    });
  },
  mounted() {
    this.hasAcct()
  },
  methods: {
    hasAcct(acctIndex = 0) {
      if (this.acctList.acctData.length == 0) {
        this.isBool = true
      } else {
        this.isBool = false
        this.acctInfo = JSON.parse(JSON.stringify(this.acctList.acctData[acctIndex]))
      }
    },
    updateInfo(info) {
      this.acctInfo[info[0].id] = info[0].value
    },
  }
};
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}
</style>
