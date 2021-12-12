<template>
  <!-- TODO: make the search input center and the icon -->
  <!-- READ the NAV tag in bootstrap -->
  <nav
    class="
      navbar navbar-light
      bg-light
      navbar-expand-md
      justify-content-md-start
      px-0
      pb-2
      border-bottom
    "
  >
    <a class="navbar-brand">
      <img class="img-fluid" style="width: 32px" src="../../assets/logo.png" />
    </a>
    <!-- button toggler -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#acct-list"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- ./end -->
    <!-- search input -->
    <div class="col-md-4 px-0 ml-md-5">
      <input
        @keyup="SEARCH_ACCT(searchItem)"
        v-model="searchItem"
        class="form-control"
        type="search"
        placeholder="Search"
      />
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SearchItem',
  data() {
    return {
      searchItem: '',
    };
  },
  methods: mapMutations(['SEARCH_ACCT']),
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
