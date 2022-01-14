<template>
  <select class="custom-select custom-select-sm border-0">
    <option
      v-for="sort in sorts"
      :key="sort.sort"
      @click="SET_SORT_ORDER(sort)">
      {{ sort.sort }}
    </option>
  </select>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SortSelect',
  data() {
    return {
      sorts: [
        { sort: 'Name A-Z', sortOrder: true, prop: 'domain' },
        { sort: 'Name Z-A', sortOrder: false, prop: 'domain' },
      ],
    }
  },
  created() {
    // REMIND: if possible to use mapMutations here to simplify?
    this.$store.commit('SET_SORT_ORDER', this.sorts[0])
  },
  methods: mapMutations(['SET_SORT_ORDER']),
}
</script>

<style></style>
