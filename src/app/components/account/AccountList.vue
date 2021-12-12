<template>
  <!-- TODO: possible to aside tag -->
  <nav id="acct-list" class="d-flex flex-column">
    <!-- header -->
    <div class="acct-list_header d-flex align-items-center px-2">
      <span>Sort by:</span>
      <span>
        <select class="custom-select custom-select-sm border-0">
          <option v-for="sort in sorts" :key="sort" @click="sortBy = sort">
            {{ sort }}
          </option>
        </select>
      </span>
      <span class="ml-auto">{{ accountCount }} logins</span>
    </div>
    <!-- List acct. -->
    <div id="acct_list-item" class="d-flex flex-column">
      <ul id="acct-lists" class="list-group bg-light">
        <AccountListItem
          v-for="account in accounts"
          :key="account.id"
          :accountItem="account"
        ></AccountListItem>
      </ul>
    </div>
    <!-- button -->
    <div class="new-acct p-3">
      <button
        @click="$router.push({ name: 'addForm' })"
        type="button"
        :disabled="this.$route.name == 'addForm'"
        class="btn btn-secondary btn-block btn-sm"
      >
        Create New Account
      </button>
    </div>
  </nav>
</template>

<script>
import AccountListItem from './AccountListItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Acctlist',
  components: {
    AccountListItem,
  },
  data() {
    return {
      sorts: ['Name (A-Z)', 'Name (Z-A)'],
      sortBy: 'Name (A-Z)',
    };
  },
  computed: {
    ...mapGetters({
      accountCount: 'accountCount',
      searchResult: 'getSeachItem',
    }),
    // TODO: refactor the sort
    accounts() {
      return this.searchResult.sort((a, b) => {
        switch (this.sortBy) {
          case 'Name (A-Z)':
            return a.domain > b.domain ? 1 : -1;
          case 'Name (Z-A)':
            return a.domain < b.domain ? 1 : -1;
        }
      });
    },
  },
};
</script>

<style scoped>
#acct-list {
  height: calc(100vh - 60px);
  padding: 0px;
  border-right: 1px solid #dee2e6;
}
select {
  outline: none;
}

.acct-list_header {
  border-bottom: 1px solid #dee2e6;
}

.acct-list_header > span {
  font-size: 0.8rem;
  color: #6c757d;
}

#acct_list-item {
  flex: 1;
  overflow: auto;
}

#acct-lists > li {
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
}

#acct-lists .active,
#acct-lists > li:hover {
  background-color: #f8f9fa;
}

.new-acct {
  border: 1px #dee2e6;
  border-style: solid none;
}

@media (max-width: 768px) {
  #acct-list {
    height: 100vh;
    position: absolute;
    background-color: #fff;
    z-index: 100;
  }
}
</style>
