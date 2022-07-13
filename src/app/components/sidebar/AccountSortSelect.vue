<template>
  <!-- <select class="custom-select custom-select-sm border-0">
    <option
      v-for="sort in sorts"
      :key="sort.sort"
      @click="SET_SORT_ORDER(sort)">
      {{ sort.sort }}
    </option>
  </select> -->
  <!-- CHECKPOINT: efficient way of hiding the <ul> element -->
  <div class="acct-custom-select" @click.self="toggleSelect()">
    <div class="acct-custom-select-main" ref="toggleChevron">
      <span> Sort: {{ sortBy }} </span>
      <font-awesome-icon icon="chevron-down" class="chevron" />
    </div>
    <!-- TODO: Try to improve the animation 1st, look in the codepen,
               Then make it more efficient -->
    <!-- COMMIT 1st b4 proceding to main -->
    <ul class="acct-custom-options" ref="toggleOptions">
      <li
        v-for="sort in sorts"
        :key="sort.sort"
        @click="toggleSelect(), (sortBy = sort.sort), SET_SORT_ORDER(sort)">
        {{ sort.sort }}
      </li>
    </ul>
  </div>
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
        // { sort: 'Username Z-A', sortOrder: true, prop: 'username' },
      ],
      sortBy: '',
    }
  },
  created() {
    // REMIND: if possible to use mapMutations here to simplify?
    this.$store.commit('SET_SORT_ORDER', this.sorts[0])
    this.sortBy = this.sorts[0].sort
  },
  //
  // methods: mapMutations(['SET_SORT_ORDER']),
  methods: {
    ...mapMutations(['SET_SORT_ORDER']),
    toggleSelect() {
      Object.values(this.$refs).forEach((el) => el.classList.toggle('active'))
    },
  },
}
</script>

<style scoped>
/*BASE START*/
ul {
  list-style-type: none;
  margin-top: 0;
  margin-bottom: 12px;
  padding-left: 0;
}
/*END */

.acct-custom-select {
  /*border: 1px solid black;*/
  position: relative;
  left: 10px;
  height: 36px;
  width: 200px;
  border-radius: 30px;
  /*outline: none;*/
  /*background: #e0e5ec;*/
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25),
    -4px -4px 4px 0 rgba(255, 255, 255, 0.3);
  /*  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.25),
    -20px -20px 60px rgba(255, 255, 255, 0.3);*/
  cursor: pointer;
}

.acct-custom-select:active {
  /*background: #e0e5ec;*/
  box-shadow: inset 4px 4px 4px 0 rgba(0, 0, 0, 0.25),
    inset -4px -4px 4px 0 rgba(255, 255, 255, 0.3);
}

/*.acct-custom-select span {
  position: absolute;
  left: 12%;
  top: 25%;
}*/
.acct-custom-select-main {
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: -1;
  /*pointer-events: none;*/
}
.acct-custom-select-main .chevron {
  transition: all 500ms ease-in-out;
}

.acct-custom-select-main.active .chevron {
  transform: rotate(180deg);
  transition: all 500ms ease-in-out;
}

.acct-custom-options {
  position: absolute;
  background: #e0e5ec;
  top: 50px;
  width: 200px;
  border-radius: 20px;
  opacity: 0;
  transition: all 500ms ease-in-out;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25),
    -4px -4px 4px 0 rgba(255, 255, 255, 0.3);
  /*border: 1px solid black;*/
  visibility: hidden;
}

.acct-custom-options.active {
  opacity: 1;
  visibility: visible;
  transition: opacity 500ms ease-in-out;
}

/*CHECKPOINT: spacing between items*/
.acct-custom-options li {
  position: relative;
  /*left: 12%;
  top: 25%;*/
  padding: 8px 20px;
  /*border: 1px solid black;*/
}

.acct-custom-options li:hover {
  background: rgba(157, 171, 192, 0.3);
}

.acct-custom-options li:first-child {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.acct-custom-options li:last-child {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
