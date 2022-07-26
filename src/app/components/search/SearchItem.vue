<template>
  <form>
    <label for="search">Search</label>
    <input
      id="search"
      v-model="searchAccount"
      @blur="searchAccount = ''"
      @keyup="SEARCH_ACCOUNT(searchAccount)" />
    <BaseIcon :icon="'search'" />
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'searchAccount',
  data() {
    return {
      searchAccount: '',
    }
  },
  // REFACTOR: the mapMutations must be in computed property
  // ERROR: if the searchAccount is empty after the @blur event the return search is also empty, regardless the searchAccount empty  it must return all the accounts
  methods: {
    ...mapMutations(['SEARCH_ACCOUNT']),
  },
}
</script>

<style lang="scss" scoped>
form {
  position: relative;

  &:focus-within {
    label {
      opacity: 0;
      transform: translateX(-25px);
    }

    svg {
      transform: rotate(90deg);
    }
  }
}

label {
  top: 50%;
  left: 5%;
  margin-top: -10.5px;
  transform: translateX(0);
  transition: all 0.25s ease-in-out 0.2s;
}

input {
  height: 50px;
  border-radius: 50px;
  @include neumorp-shadow(2);
}

svg {
  transition: transform 0.25s ease-in-out;
}
</style>
