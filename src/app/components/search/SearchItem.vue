<template>
  <form action="">
    <label for="Search">Search</label>
    <input
      @keyup="SEARCH_ACCOUNT(searchItem)"
      class="search-input"
      v-model="searchItem"
      @focus="setFocus"
      @blur="setFocus"
      type="search" />
    <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SearchItem',
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
  color: $color-light-grey;
}

label {
  position: absolute;
  top: 50%;
  left: 5%;
  margin-top: -10.5px;
  transform: translateX(0);
  transition: all 250ms ease-in-out 200ms;
}

label.active {
  transform: translateX(-25px);
  opacity: 0;
}

.search-input {
  height: 50px;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 4px 4px 6px rgba(187, 195, 206, 0.6),
    -5px -5px 7px rgba(255, 255, 255, 0.7);
}

.search-icon {
  position: absolute;
  left: 2%;
  top: 50%;
  margin-top: -8px;
  color: #90a4ae;
  transition: transform 250ms ease-in-out;
}

.search-icon.active {
  transform: rotate(90deg);
}
</style>
