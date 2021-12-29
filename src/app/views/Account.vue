<template>
  <!-- Need to change the attr. ID, Class, name conflict(acct-info) -->
  <div id="acct-info">
    <div class="acct-info_header d-flex align-items-center">
      <!-- this line will new component will be place -->
      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="mr-2" />
        {{ account.domain }}
      </h4>

      <button
        v-if="$route.name != 'edit'"
        @click="$router.push({ name: 'edit' })"
        type="button"
        class="btn btn-default btn-light mx-1">
        <font-awesome-icon icon="pencil-alt" class="mr-md-1" />
        <span class="text-muted">Edit</span>
      </button>
      <button
        @click="deleteAccount(account.id)"
        type="button"
        class="btn btn-default btn-light mx-1">
        <font-awesome-icon icon="trash" class="mr-md-1" />
        <span class="text-muted">Remove</span>
      </button>
    </div>
    <hr />
    <!-- Website address Start -->
    <div class="mb-3">
      <label class="col-form-label">website address</label>
      <div>
        <a :href="account.url" style="font-size: 15px">{{ account.url }}</a>
      </div>
    </div>
    <!-- TODO: Prob. in column  -->
    <router-view />
    <hr class="mx-0" style="width: 40px" />
    <div class="acct-info_date">
      <p>Created: {{ account.created }}</p>
      <p>Last modified: {{ account.last_modified }}</p>
      <p>Last used: {{ account.last_used }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Account',
  props: ['id', 'refModal'],
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters(['getAccount', 'getActiveIndex']),
    account() {
      return this.getAccount(this.id)
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

<style>
/* .acct-info_header button {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  color: #343a40;
  background-color: #f8f9fa;
} */

.acct-info_date > p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.acct-edit_buttons > button {
  margin-top: 2rem;
  min-width: 100px;
}

.btn.btn-default {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  color: #343a40;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  #acct-info {
    padding: 1.5rem 0.5rem;
  }
  .acct-info_header button > span {
    display: none;
  }
}
</style>
