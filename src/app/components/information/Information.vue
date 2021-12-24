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
    <router-view></router-view>
    <!-- <AddForm /> -->
    <!--    <DetailsForm
      v-if="accountCount"
      :info="getAccountById"
      @update="updateInfo"
      @fetch="hasAcct" <div class="dialog-title">Remove this Account?</div>
    <div class="dialog-description">This action cannot be undone.</div>
    /> -->
    <!-- TODO: Save the testModal to $store -->
    <ModalDialog ref="modalDialog">
      <template #title></template>
      <template #description></template>
    </ModalDialog>
  </div>
  <!-- <ModalDialog @fetch="hasAcct" /> -->
</template>
<script>
import AddForm from './AddForm.vue'
import AccountList from '../sidebar/AccountList.vue'
import ModalDialog from '../modal/ModalDialog.vue'
import { store } from '../../../store.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Information',
  data() {
    return {
      acctList: store.state,
      acctInfo: {},
      focusId: 1,
    }
  },
  components: {
    AddForm,
    AccountList,
    ModalDialog,
  },
  created() {
    // created for $emit
    this.$EventBus.$on('close', () => (this.showModal = false))
  },
  mounted() {
    // this.hasAcct();
    this.$store.commit('SET_REF_MODAL', this.$refs.modalDialog)
  },
  computed: {
    ...mapGetters(['accountCount']),
    // hasAccounts() {
    //   // change this line this.$store.getters.accountCount
    //   return this.$store.getters.acctItems.length;
    // },
    getAccountById() {
      return this.$store.state.accounts.find((account) => {
        return account.id == (this.$route.params.id ? this.$route.params.id : 1)
      })
    },
  },
  methods: {
    hasAcct(acctIndex = 0) {
      if (this.acctList.acctData.length == 0) {
        // What isBool for?
        this.isBool = true
      } else {
        this.isBool = false
        // This part is repeated procedure in getAccountId() using Index
        this.acctInfo = JSON.parse(
          JSON.stringify(this.acctList.acctData[acctIndex])
        )
        // Not sure for this part, but it will focus a
        this.focusId = this.acctList.acctData[acctIndex].id
      }
    },
    updateInfo(info) {
      this.acctInfo[info[0].id] = info[0].value
    },
  },
}
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
