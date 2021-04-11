<template>
  <nav id="acct-list" class="col-lg-3 col-sm-4">
    <div class="acct-list__header d-flex align-items-center">
      <span class="pl-2">Sort by:</span>
      <span class="">
        <select class="custom-select custom-select-sm border-0 bg-light">
          <option>Name (A-Z)</option>
          <option>Name (A-Z)</option>
        </select>
      </span>
      <span class="ml-auto mr-2">{{ acctTotal }} logins</span>
    </div>
    <!-- List acct. -->
    <div id="acct__list-item" class="d-flex flex-column ">
      <!-- TODO: only border bottom is present -->
      <ol id="acct-lists" class="list-group bg-light">
        <li class="acct-item d-flex justify-content-start"
            v-for="list in acctLists.acctData" :key="list.id">
          <font-awesome-icon icon="globe" class="align-self-center mr-3" />
          <div class="d-flex flex-column">
            <span>{{ list.website }}</span>
            <span class="text-muted">{{ list.username}}</span>
          </div>
        </li>

      </ol>
    </div>
    <div class="new-acct p-3">
      <button :disabled=" isDisable == true" @click="createAcct()" type="button" class="btn btn-secondary btn-block btn-sm">
        Create New Account
      </button>
    </div>
  </nav>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "Acctlist",
  data() {
    return {
      acctLists: '',
      isDisable: '',
      acctTotal: ''
    };
  },
  mounted() {
    //no data disable
    if (this.acctLists.length == 0) {
      this.isDisable = true;
    }

    this.acctLists = store.state.acctData
  },
  updated() {
    this.acctLists = store.state
    this.acctTotal = this.acctLists.acctData.length

  },
  methods: {
    getTotalAcct() {
      return this.acctLists.length;
    },
    //Create a function that will always be True
    createAcct() {
      // this.$EventBus.$emit('createAcct', true);      
    }
  },
};
</script>


<style scoped>
@media (max-width: 768px) {
  #acct-list {
    height: 100vh;
    position: absolute;
    background-color: #fff;
    z-index: 100;
  }
}

#acct-list {
  height: calc(100vh - 60px);
  padding: 0;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
}

.acct-list__header {
  border-bottom: 1px solid #dee2e6;
}

.acct-list__header > span {
  font-size: 0.8rem;
  color: #6c757d;
}
#acct__list-item {
  height: 484px;
}

#acct__list-item ol {
  max-height: 484px;
  overflow: auto;
}

#acct-lists > li {
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
}

.new-acct {
  position: relative;
  border-top: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-right: 0px;
}

.list-group-item {
  border: 0px;
  border-bottom: 1px solid #dee2e6;
}
</style>