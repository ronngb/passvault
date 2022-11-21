<template>
  <nav class="acct-list-nav">
    <transition-group name="list-transition" tag="ul" appear>
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
import AccountSortSelect from './AccountSortSelect.vue'
import NeumorpButton from '../neumorp/NeumorpButton.vue'
import { neumorpMixin } from '@/app/mixins/neumorpMixin.js'
import { mapGetters } from 'vuex'

export default {
  name: 'AccountList',
  components: {
    AccountListItem,
    AccountSortSelect,
    NeumorpButton,
  },
  // TODO: change to mapState
  computed: mapGetters({ accounts: 'getAccounts' }),
}
</script>

<style lang="scss" scoped>
.acct-list-nav {
  height: 80vh;
  padding: 0 10px;
  scrollbar-width: none;
  overflow: auto;
  position: relative;
}

::-webkit-scrollbar {
  display: none;
}

.list-transition-enter {
  opacity: 0;
  transform: translateY(10px);
}
.list-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-transition-leave-active {
  position: absolute;
}
</style>
