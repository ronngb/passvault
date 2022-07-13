<template>
  <section class="acct-info-section">
    <header class="acct-info-header">
      <font-awesome-icon :icon="['fas', 'globe']" class="globe-icon" />
      <hgroup class="acct-create-heading">
        <h1 class="main-heading">{{ account.domain }}</h1>
        <h2 class="sub-heading">Login</h2>
      </hgroup>
      <div class="buttons-container">
        <button
          :class="{ 'btn-sm': true, active: routeCheck }"
          :disabled="routeCheck"
          @click="$router.push({ name: 'account-edit' })">
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            class="icons pencil-icon" />
        </button>
        <button :class="{ 'btn-sm': true }" @click="deleteAccount(account.id)">
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="icons trash-icon" />
        </button>
      </div>
      <div class="seperator"></div>
    </header>
    <transition name="slide-fade" mode="out-in">
      <router-view :ref-modal="refModal" :account="account" />
    </transition>

    <section class="acct-info-dates">
      <p>Created: {{ account.created }}</p>
      <p>Last modified: {{ account.last_modified }}</p>
      <!-- <p>Last used: {{ account.last_used }}</p> -->
    </section>
  </section>
</template>

<script>
import BaseInput from '../components/base/BaseInput.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Account',
  components: { BaseInput },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    refModal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters(['getAccount', 'getActiveIndex']),
    account() {
      return this.getAccount(this.id)
    },
    routeCheck() {
      if (this.$route.name == 'account-edit') {
        return true
      }
      return false
    },
  },
  methods: {
    deleteAccount(id) {
      this.refModal.modalOn(true).then((res) => {
        if (res) {
          this.$router.replace({
            name: 'detail',
            params: { id: this.getActiveIndex(id) },
          })
          this.$store.dispatch('deleteAccount', id)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.website-label {
  display: block;
  color: $color-light-grey;
  font-size: 14px;
}

.acct-url-link {
  display: inline-block;
  color: $color-dark-grey;
  // width: 300px;
  height: 48px;
  margin: 0 4px;
  line-height: 48px;
  text-decoration: none;
}
.acct-info-section {
  display: grid;
  grid-template-columns: calc(100vw - 32px);
  //grid-template-rows: repeat(2, max-content) repeat(2, 1fr);
  grid-template-rows: max-content 1fr max-content;
  height: 100%;
  max-width: 490px;
  // width: max-content;
}

.acct-info-header {
  display: flex;
  gap: 5px 8px;
  flex-wrap: wrap;
  align-items: center;
}

.globe-icon {
  font-size: 2.8em;
  color: $color-light-grey;
}

.acct-create-heading {
  line-height: 0.9;
  flex-grow: 2;
}

.main-heading {
  font-size: 20px;
  font-weight: 700;
  color: $color-dark-grey;
}

.sub-heading {
  color: $color-dark-grey;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;
  font-size: 13px;
}

.acct-info_date > p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 250ms ease-in-out;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.btn-sm:hover .trash-icon {
  color: $color-danger;
}

.btn-sm:hover .pencil-icon {
  color: $color-secondary;
}

.btn-sm.active .pencil-icon {
  color: $color-secondary;
}

@media screen and (min-width: 1200px) {
  .acct-info-section {
    grid-template-columns: 1fr;
  }
}

/*
@media (max-width: 768px) {
  #acct-info {
    padding: 1.5rem 0.5rem;
  }
  .acct-info_header button > span {
    display: none;
  }
}*/
</style>
