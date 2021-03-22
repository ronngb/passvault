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
      <hr class="d-block d-lg-none">
    </div>
    <!-- Header End -->
    <hr class="d-none d-lg-block"><!-- Line Seperator -->

    <form class="acct-new__form">
      <!-- Website address Start -->
      <div class="acct-new__input col-8 col-md-5">
        <label>Website address</label>
        <!-- TODO:Make it longer with border with rounded corner -->
        <input type="text" v-model="inputWebsite" class="form-control-plaintext" id="website">
      </div>
      <!-- Username Start -->
      <div class="acct-new__input col-8 col-md-5">
        <label>Username</label>
        <input type="text" v-model="inputUsername" class="form-control-plaintext" id="username">
      </div>
      <!-- Password Start -->
      <div class="acct-new__input col-8 col-md-5">
        <label>Password</label>
        <div class="form-row mx-0 align-items-center flex-row-reverse">
          <!-- ERROR: Still has a problem regarding on checkbox position -->
          <input type="text" v-model="inputPassword" class="border form-control-plaintext" id="password">
          <input class="form-check-input" type="checkbox">

          <!-- <div class="col-6 col-md-3">            
          </div>
          <div class="col-2">
            <div class="form-check form-check-inline">              
            </div>
          </div> -->
        </div>
      </div>
      <!-- It has to be natural gutter for every div tag -->
      <div class="acct-new__button">
        <button @click="submitForm()" type="button" class="btn mr-1">
          Save
        </button>
        <button :disabled="isDisable == true" type="button" class="btn ml-1">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "AccountAdd",
  props: ['isDisable'],
  data() {
    return {
      acctForm: { website: '', username: '', password: '' },
      inputWebsite: '',
      inputUsername: '',
      inputPassword: ''
    }
  },
  methods: {
    submitForm() {
      //instantiate then call store object
      this.acctForm['website'] = this.inputWebsite
      this.acctForm['username'] = this.inputUsername
      this.acctForm['password'] = this.inputPassword

      store.storeAcct(this.acctForm)

    }
  }

};
</script>

<style>
/* #acct-new {
  padding: 3rem 3rem;
} */
.acct-new__input {
  padding: 0rem !important;
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

.acct-new__button button {
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
    padding: 1.5rem 1.5rem;
  }

  .form-check-input {
    left: 17rem;
  }
}
</style>
