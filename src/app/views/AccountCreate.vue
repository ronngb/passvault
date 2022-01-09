<template>
  <!-- Need to change the attr. ID, Class, name conflict(acct-new) -->
  <div id="acct-new">
    <div class="acct-new__header d-lg-flex align-items-center">
      <!-- this line will new component will be place -->
      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="mr-2" />
        Create New Account
      </h4>
      <!-- This <hr> will appear in mobile -->
      <hr class="d-block d-lg-none" />
    </div>
    <!-- Header End -->
    <hr class="d-none d-lg-block" />
    <!-- Line Seperator -->

    <form class="acct-new__form">
      <!-- Website address(URL) Start -->
      <div class="form-group acct-new_input col-11 col-md-5">
        <label>Website address</label>
        <input
          type="text"
          @blur="formData.url = autoAppend(formData.url)"
          v-model="formData.url"
          :class="{ 'form-control': true, 'is-invalid': errors[0] }"
          id="website" />
        <div class="invalid-feedback">Your website address is required.</div>
      </div>
      <!-- USERNAME START -->
      <div class="form-group acct-new_input col-11 col-md-5">
        <label>Username</label>
        <input
          type="text"
          v-model="formData.username"
          :class="{ 'form-control': true, 'is-invalid': errors[1] }"
          id="username" />
        <div class="invalid-feedback">Your username is required.</div>
      </div>
      <!-- PASSWORD START -->
      <div class="form-group acct-new_input">
        <label>Password</label>
        <div class="form-row align-items-center">
          <div class="form-group pr-1 col-11 col-md-5">
            <input
              :type="inputType"
              v-model="formData.password"
              :class="{ 'form-control': true, 'is-invalid': errors[2] }"
              id="password" />
            <div class="invalid-feedback">Your password is required.</div>
          </div>
          <div class="form-group col-1 col-md-1" :class="{ 'mb-5': errors[2] }">
            <font-awesome-layers
              @click="inputType = inputType ? '' : 'password'"
              style="font-size: 16px">
              <font-awesome-icon :icon="['fas', 'eye']" />
              <font-awesome-icon
                v-if="inputType != 'password'"
                :icon="['fas', 'slash']" />
            </font-awesome-layers>
          </div>
        </div>
      </div>
      <!-- It has to be natural gutter for every div tag -->
      <!-- BUTTON START -->
      <div class="acct-new_button">
        <button @click="submitForm" type="button" class="btn mr-1">Save</button>
        <button
          @click="$router.go(-1)"
          :disabled="account.accounts.length <= 0"
          type="button"
          class="btn ml-1">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<!-- eslint-disable -->
<script>
import dayjs from 'dayjs'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AccountCreate',
  props: {
    refModal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { url: '', username: '', password: '' },
      errors: [],
      inputType: 'password',
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.formDataWatch) {
      this.refModal.modalOn().then((res) => {
        if (res) {
          next()
        } else {
          next(false)
        }
      })
    } else {
      next()
    }
  },
  computed: {
    ...mapState({ account: 'account' }),
    formDataWatch() {
      return !Object.values(this.formData).every((value) => value === '')
    },
  },
  methods: {
    submitForm() {
      this.errors = []

      Object.values(this.formData).forEach((obj) => {
        obj == 0 ? this.errors.push(1) : this.errors.push(0)
      })

      if (!this.errors.includes(1)) {
        // TODO: Possible to make this async
        this.$store.dispatch('storeAccount', this.formData)
        this.clearForm()
      }
    },
    autoAppend(url) {
      const scheme = 'https://'
      return url ? (url.indexOf(scheme) == -1 ? scheme.concat(url) : url) : url
    },
    clearForm() {
      for (let input in this.formData) this.formData[input] = ''
    },
  },
}
</script>

<style>
/* #acct-new {
  padding: 3rem 3rem;
} */
.acct-new_input {
  padding-left: 0px !important;
  padding-right: 5px !important;
  margin: 2.375rem 0rem;
}

.acct-new__input label {
  margin-bottom: 0rem;
  font-size: 0.8rem;
}

.acct-new__input input {
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.acct-new_button button {
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-top: 2rem;
  min-width: 100px;
}

.form-check-input {
  left: 20rem;
}

@media (max-width: 768px) {
  #acct-new {
    padding: 1.5rem 0.5rem;
  }

  .acct-new_button {
    display: flex;
    justify-content: center;
  }
}
</style>
