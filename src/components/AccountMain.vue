<template>
  <div class="row">
    <AccountList :acct-list=acctList :set-id=focusId @changeFocus="hasAcct"
                 @createAcct="isBool = true" />
    <main id="acct-main" class="col-md-7 ">
      <AccountInfo v-if="!isBool" :info="acctInfo" @update="updateInfo"
                   @fetch="hasAcct" />
      <AccountNew v-if="isBool" @update="hasAcct" />
    </main>
    <ConfirmDialog @fetch="hasAcct" />
  </div>
</template>
<!-- eslint-disable -->
<script>
import AccountInfo from "./AccountInfo.vue";
import AccountNew from "./AccountNew.vue";
import AccountList from "./AccountList.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import { store } from "../store.js";

export default {
  name: "AccountMain",
  data() {
    return {
      acctList: store.state,
      acctInfo: {},
      isBool: '',
      focusId: 1
    }
  },
  components: {
    AccountInfo,
    AccountNew,
    AccountList,
    ConfirmDialog
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
        this.acctInfo = JSON.parse(
          JSON.stringify(this.acctList.acctData[acctIndex]))
        this.focusId = this.acctList.acctData[acctIndex].id
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

@media (max-width: 768px) {
  #acct-main {
    padding: 1.5rem 1.5rem;
  }
}
</style>
