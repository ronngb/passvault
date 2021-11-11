<template>
  <nav id="acct-list" class="d-flex flex-column col-lg-3 col-sm-4">
    <!-- header -->
    <div class="acct-list_header d-flex align-items-center px-2">
      <span>Sort by:</span>
      <span>
        <select
          v-model="sortBy"
          class="custom-select custom-select-sm border-0"
        >
          <option @click="sortAcct(sortBy)">Name (A-Z)</option>
          <option @click="sortAcct(sortBy)">Name (Z-A)</option>
        </select>
      </span>
      <span class="ml-auto">{{ totalAcct }} logins</span>
    </div>
    <!-- List acct. -->
    <div id="acct_list-item" class="d-flex flex-column">
      <ol id="acct-lists" class="list-group bg-light">
        <li
          class="acct-item d-flex justify-content-start"
          v-for="(list, index) in acctList.acctData"
          :key="list.id"
          @click="$emit('changeFocus', index), setFocus(list.id)"
          :class="{ active: list.id === focusId }"
        >
          <font-awesome-icon icon="globe" class="align-self-center mr-3" />
          <div class="d-flex flex-column">
            <span>{{ list.domain }}</span>
            <span class="text-muted">{{ hasUsername(list.username) }}</span>
          </div>
        </li>
      </ol>
    </div>
    <!-- button -->
    <div class="new-acct p-3">
      <button
        @click="$emit('createAcct')"
        type="button"
        class="btn btn-secondary btn-block btn-sm"
      >
        Create New Account
      </button>
    </div>
  </nav>
</template>

<script>
import { store } from '../../../store.js';

export default {
  name: 'Acctlist',
  props: ['acctList', 'setId'],
  data() {
    return {
      sortBy: 'Name (A-Z)',
      focusId: this.setId,
      isDisable: '',
    };
  },
  mounted() {
    this.sortAcct(this.sortBy);
  },
  watch: {
    setId(acctId) {
      this.focusId = acctId;
    },
  },
  computed: {
    totalAcct() {
      return this.acctList.acctData.length;
    },
  },
  methods: {
    sortAcct(sort) {
      store.sortAcct(sort);
    },
    setFocus(id) {
      this.focusId = id;
    },
    hasUsername(username) {
      return username == '' ? '(no username)' : username;
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
