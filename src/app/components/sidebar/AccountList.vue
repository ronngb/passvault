<template>
  <nav class="acct-list-nav">
    <!-- header -->
    <!-- possible to make it header? -->
    <header class="acct-list-header">
      <!-- TODO: maybe change the span to label? -->
      <!-- <span>Sort by:</span> -->
      <!-- <span>     
      </span> -->
      <!-- <AccountSortSelect /> -->
      <!-- <span>{{ accounts.length }} logins</span> -->
    </header>
    <!-- List acct. -->
    <transition-group class="acct-list" name="slide" tag="ul">
      <AccountListItem
        v-for="account in accounts"
        :key="account.id"
        :accountItem="account" />
    </transition-group>
    <!-- button -->
    <button
      @click="$router.push({ name: 'account-create' })"
      type="button"
      v-pressed="this.$route.name == 'account-create'"
      class="acct-list-new-btn">
      <font-awesome-icon :icon="['fas', 'plus']" class="plus-icon" />
    </button>
  </nav>
</template>

<script>
import AccountListItem from './AccountListItem.vue'
import AccountSortSelect from './AccountSortSelect.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AccountList',
  components: {
    AccountListItem,
    AccountSortSelect,
  },
  directives: {
    pressed: {
      update(el, binding, vnode) {
        if (binding.value == true) {
          el.classList.add('active')

          setTimeout(() => {
            el.firstChild.classList.add('active')
          }, 350)
        } else {
          el.classList.remove('active')
          el.firstChild.classList.remove('active')
        }
      },
    },
  },
  computed: mapGetters({ accounts: 'sortAccount' }),
}
</script>

<style lang="scss" scoped>
.acct-list-nav {
  height: 80vh;
  padding: 0 15px;
  // position: relative;
  scrollbar-width: none;
  overflow: auto;
  // border: 1px solid black;
  /*width: 100%;*/
}

.acct-list-header {
  // padding: 12px 0;
}

::-webkit-scrollbar {
  display: none;
  // background: red;
}

.acct-list-new-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  position: absolute;
  right: 10px;
  // top: 40px;
  bottom: 30px;
  background-color: $color-primary-bg;
  transition: transform 75ms ease-in-out;
  box-shadow: $bsd-rounded-btn;
}

.acct-list-new-btn.active {
  opacity: 0;
  transform: scale(0);
  transition: all 75ms ease-in-out 350ms;
  animation: inset-rounded 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
}

.plus-icon.active {
  color: rgba(163, 177, 198, 0.6);
  transform: rotate(-45deg);
  transition: all 75ms ease-in-out;
}

.plus-icon {
  color: #9574cd;
  transition: all 150ms ease-in-out;
  font-size: 1.5em;
}

/* Start Animation*/
.slide-enter {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-active {
  transition: all 0.2s ease;
}

.slide-move {
  transition: transform 1s ease-out;
}
/* End Animation*/

/*.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}*/

/*UN USE
.new-acct {
  border: 1px #dee2e6;
  border-style: solid none;
}

.acct-list_header > span {
  font-size: 0.8rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  #acct-list {
    height: 100vh;
    position: absolute;
    background-color: #fff;
    z-index: 100;
  }
}

.pv-acct-list-header span:last-child {
  float: right;
}
*/
</style>
