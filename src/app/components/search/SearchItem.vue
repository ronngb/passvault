<template>
  <form>
    <label for="Search">Search</label>
    <input
      type="search"
      class="search-input"
      v-model="searchItem"
      @focus="setFocus"
      @blur="setFocus"
      @keyup="SEARCH_ACCOUNT(searchItem)" />
    <BaseIcon :icon="'search'" />
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import BaseIcon from '../base/BaseIcon.vue'

export default {
  name: 'SearchItem',
  components: {
    BaseIcon,
  },
  data() {
    return {
      searchItem: '',
    }
  },
  // REFACTOR: the mapMutations must be in computed property
  // ERROR: if the searchItem is empty after the @blur event the return search is also empty, regardless the searchItem empty  it must return all the accounts
  methods: {
    ...mapMutations(['SEARCH_ACCOUNT']),
    setFocus(event) {
      // REFACTOR: maybe the target api is redundant
      event.target.previousSibling.classList.toggle('active')
      event.target.nextSibling.classList.toggle('active')
      if (event.type == 'blur') {
        this.searchItem = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  position: relative;
}

label {
  top: 50%;
  left: 5%;
  margin-top: -10.5px;
  transform: translateX(0);
  transition: all 0.25s ease-in-out 0.2s;

  &.active {
    opacity: 0;
    transform: translateX(-25px);
  }
}

svg {
  transition: transform 0.25s ease-in-out;

  &.active {
    transform: rotate(90deg);
  }
}

.search-input {
  height: 50px;
  border-radius: 50px;
  // TODO: make the rgba smaller
  box-shadow: 4px 4px 6px rgba(187, 195, 206, 0.6),
    -5px -5px 7px rgba(255, 255, 255, 0.7);
  // font-weight: 600;
}
</style>
