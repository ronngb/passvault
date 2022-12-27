<template>
  <main class="main-content">
    <router-view :key="$route.params.id" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AccountHome',
  computed: mapState({ accounts: (state) => state.account.accounts }),
  watch: {
    accounts(acct) {
      if (acct.length) {
        this.$router.replace({
          name: 'account-detail',
          params: { id: acct[0].id },
        })
      } else this.$router.replace({ name: 'account-create' })
    },
  },
}
</script>

<style></style>
