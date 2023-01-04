<template>
  <main ref="main" class="main-content">
    <router-view :key="$route.params.id" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AccountHome',
  props: {
    id: {
      type: [Number, String],
    },
  },
  computed: mapState({ accounts: (state) => state.account.accounts }),
  mounted() {
    setTimeout(() => this.setActiveAccount(this.accounts), 250)
  },
  watch: {
    accounts(obj) {
      this.setActiveAccount(obj)
    },
  },
  methods: {
    setActiveAccount(obj) {
      if (obj.length) {
        if (this.id == undefined) {
          this.$router.replace({
            name: 'account-detail',
            params: { id: obj[0].id },
          })
        }
      } else this.$router.replace({ name: 'account-create' })
    },
  },
}
</script>

<style></style>
