<template>
  <nav id="acct-list" class="col-lg-3 col-sm-4">
    <div class="acct-list__header d-flex align-items-center">
      <span class="pl-2">Sort by:</span>
      <span class="">
        <select v-model="sortBy" class="custom-select custom-select-sm border-0 bg-light">
          <option @click="sortAcct(sortBy)">Name (A-Z)</option>
          <option @click="sortAcct(sortBy)">Name (Z-A)</option>
        </select>
      </span>
      <span class="ml-auto mr-2">{{ acctLenght }} logins</span>
    </div>
    <!-- List acct. -->
    <div id="acct__list-item" class="d-flex flex-column ">
      <!-- TODO: only border bottom is present -->
      <ol id="acct-lists" class="list-group bg-light">
        <li class="acct-item d-flex justify-content-start" @click="$EventBus.$emit('setIndex', index), setFocus($event)" v-for="(list, index) in acctList.acctData" :key="list.website">
          <font-awesome-icon icon="globe" class="align-self-center mr-3" />
          <div class="d-flex flex-column">
            <span>{{ list.domain }}</span>
            <span class="text-muted">{{ list.username }}</span>
          </div>
        </li>

      </ol>
    </div>
    <div class="new-acct p-3">
      <button @click="$EventBus.$emit('createAcct')" type="button" class="btn btn-secondary btn-block btn-sm">
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
      acctList: store.state,
      sortBy: 'Name (A-Z)',
      isDisable: '',
    };
  },
  mounted() {
    this.sortAcct(this.sortBy)
  },
  updated() {
    this.acctList = store.state
  },
  computed: {
    acctLenght() {
      return this.acctList.acctData.length
    },
  },
  methods: {
    sortAcct(sort) {
      store.sortAcct(sort)
    },
    setFocus(e) {
      let sibling = e.currentTarget.parentNode.firstChild
      e.currentTarget.style.background = "#f8f9fa"
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e.currentTarget) {
          sibling.style.background = ""
        }
        sibling = sibling.nextSibling;
      }
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

#acct-lists > li:hover,
#acct-lists > li:focus {
  background: #f8f9fa;
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