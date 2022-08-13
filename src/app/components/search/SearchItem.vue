<template>
  <form @submit.prevent="">
    <label for="search">Search</label>
    <input
      id="search"
      v-model="searchAccount"
      @blur="searchAccount = null"
      @focus="SEARCH_ACCOUNT(searchAccount)"
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
  methods: mapMutations(['SEARCH_ACCOUNT']),
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
  @include neumorp-shadow(1);
}

svg {
  transition: transform 0.25s ease-in-out;
}
</style>
