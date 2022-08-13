<template>
  <nav class="acct-list-nav">
    <transition-group name="list-transition" tag="ul" appear>
      <AccountListItem
        v-for="account in accounts"
        :key="account.id"
        :account="account" />
    </transition-group>
    <button
      type="button"
      v-if="$route.name != 'account-create'"
      v-click:float="() => $router.push({ name: 'account-create' })">
      <BaseIcon :icon="'plus'" :indefault="false" />
    </button>
  </nav>
</template>

<script>
import AccountListItem from './AccountListItem.vue'
import AccountSortSelect from './AccountSortSelect.vue'
import { neumorpMixin } from '@/app/mixins/neumorpMixin.js'
import { mapGetters } from 'vuex'

export default {
  name: 'AccountList',
  components: {
    AccountListItem,
    AccountSortSelect,
  },
  mixins: [neumorpMixin],
  // TODO: change to mapState
  computed: mapGetters({ accounts: 'getAccounts' }),
}
</script>

<style lang="scss" scoped>
svg {
  color: $tertiary-color !important;
  font-size: 2rem !important;
}

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

.float-btn {
  @include neumorp-button(5.6rem, 5.6rem, 50%, $float);
  bottom: 30px;
  left: 20vw;
  position: fixed;
  &.clicked {
    animation: buttonClicked 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  }
}

@include neumorp-keyframes($float);

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
