<template>
  <nav class="account-nav">
    <transition-group
      name="list-transition"
      class="account-list"
      tag="ul"
      appear>
      <AccountListItem
        v-for="account in accounts"
        :key="account.id"
        :account="account" />
    </transition-group>
    <NeumorpButton
      type="button"
      class="btn-submit btn-float"
      v-if="$route.name != 'account-create'"
      @click="$router.push({ name: 'account-create' })">
      <BaseIcon icon="plus" class="plus-icon" />
    </NeumorpButton>
  </nav>
</template>

<script>
import AccountListItem from './AccountListItem.vue'
import NeumorpButton from '../neumorp/NeumorpButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AccountList',
  components: {
    AccountListItem,
    NeumorpButton,
  },
  computed: mapGetters({ accounts: 'getAccounts' }),
}
</script>

<style lang="scss" scoped>
.account-nav {
  height: 80vh;
  padding: 0 10px;
  scrollbar-width: none;
  overflow: auto;
  position: relative;
}

::-webkit-scrollbar {
  display: none;
}
</style>
