<template>
  <!--  <AccountList
      :acct-list="acctList"
      :set-id="focusId"
      @changeFocus="hasAcct"
      @createAcct="isBool = true"
    /> -->
  <!-- TODO: Create New Component for creating a new account if there's none -->
  <div id="acct-main" class="">
    <!-- REMIND: This maybe place for router-view -->
    <!-- <router-view></router-view> -->
    <DetailsForm
      v-if="hasAccounts"
      :info="getAccountById"
      @update="updateInfo"
      @fetch="hasAcct"
    />
  </div>
  <!-- <ConfirmDialog @fetch="hasAcct" /> -->
</template>
<script>
import DetailsForm from './DetailsForm.vue';
import AccountNew from './AccountNew.vue';
import AccountList from '../account/AccountList.vue';
import ConfirmDialog from '../ConfirmDialog.vue';
import { store } from '../../../store.js';

export default {
  name: 'Information',
  data() {
    return {
      acctList: store.state,
      acctInfo: {},
      focusId: 1,
    };
  },
  components: {
    DetailsForm,
    AccountNew,
    AccountList,
    ConfirmDialog,
  },
  mounted() {
    // this.hasAcct();
  },
  computed: {
    hasAccounts() {
      return this.$store.getters.acctItems.length;
    },
    getAccountById() {
      return this.$store.state.accounts.find((account) => {
        return (
          account.id == (this.$route.params.id ? this.$route.params.id : 1)
        );
      });
    },
  },
  methods: {
    hasAcct(acctIndex = 0) {
      if (this.acctList.acctData.length == 0) {
        this.isBool = true;
      } else {
        this.isBool = false;
        this.acctInfo = JSON.parse(
          JSON.stringify(this.acctList.acctData[acctIndex])
        );
        this.focusId = this.acctList.acctData[acctIndex].id;
      }
    },
    updateInfo(info) {
      this.acctInfo[info[0].id] = info[0].value;
    },
  },
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
