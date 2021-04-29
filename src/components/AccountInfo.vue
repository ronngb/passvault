<template>
  <!-- Need to change the attr. ID, Class, name conflict(acct-info) -->
  <div id="acct-info">
    <div class="acct-info__header d-lg-flex align-items-center">
      <!-- this line will new component will be place -->
      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="mr-2" />
        {{ info.domain }}
      </h4>
      <!-- This <hr> will appear in mobile -->
      <hr class="d-block d-lg-none" />

      <button v-if="!isEdit" @click="onEdit(info.id)" type="button"
              class="btn mx-1">
        <span class="text-muted">
          <font-awesome-icon icon="pencil-alt" class="mr-1" />Edit
        </span>
      </button>
      <button @click="removeAcct(info.id)" type="button" class="btn mx-1">
        <span class="text-muted">
          <font-awesome-icon icon="trash" class="mr-1" />Remove
        </span>
      </button>
    </div>
    <!-- Header End -->
    <hr class="d-none d-lg-block" />
    <!-- Line Seperator -->
    <!-- Website address Start -->
    <div class="mb-3">
      <label class="col-form-label">website
        address</label>
      <div>
        <a :href="info.url" style="font-size: 15px">{{ info.url }}</a>
      </div>
    </div>
    <!-- TODO: Prob. in column  -->
    <!-- Website address End -->
    <form class="acct-info__form">
      <!-- Username Start -->
      <div class="mb-3">
        <label class="label">Username</label>
        <div class="form-row">
          <div class="col-8 col-md-5">
            <input type="text" :readonly="!isEdit"
                   :class="{'form-control-plaintext':!isEdit, 'form-control': isEdit}"
                   @input="$emit('update',[$event.target]),
                   (inputForm.username = $event.target.value)"
                   :value="info.username" id="username" />
          </div>
          <div v-if="!isEdit" class="col-4 col-md-5 align-self-center">
            <button :disabled="isUser"
                    @click="toClipboard(info.username, 'isUser')" type="button"
                    class="btn btn-light px-lg-5">
              <span v-if="isUser" class="text-muted">Copied!</span>
              <span v-if="!isUser" class="text-muted">Copy</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Password Start -->
      <div class="mb-3">
        <label class="label">Password</label>
        <div class="form-row align-items-center">
          <div class="col-6 col-md-3">
            <input :type="inputType" :readonly="!isEdit"
                   :class="{'is-invalid': true,'form-control-plaintext': !isEdit, 'form-control': isError}"
                   @input="$emit('update',[$event.target]),
                   (inputForm.password = $event.target.value)"
                   :value="info.password" id="password" />
            <div v-if="isEdit && isError" class="invalid-feedback">
              Your password is required.
            </div>
          </div>
          <div class="col-2">
            <div @click="showPassword" class="form-check">
              <!-- BUGS -->
              <font-awesome-icon v-if="!isShow" icon="eye" />
              <font-awesome-icon v-if="isShow" icon="eye-slash" class />
            </div>
          </div>
          <div v-if="!isEdit" class="col-4">
            <button :disabled="isPass"
                    @click="toClipboard(info.password, 'isPass')" type="button"
                    class="btn btn-light px-lg-5">
              <span v-if="isPass" class="text-muted">Copied!</span>
              <span v-if="!isPass" class="text-muted">Copy</span>
            </button>
          </div>
        </div>
      </div>
      <!--  -->
      <div v-if="isEdit" class="acct-new__button">
        <button @click.stop="editAcct(info.id)" type="button"
                class="btn mr-1">Save</button>
        <button @click="onEdit(info.id)" type="button"
                class="btn ml-1">Cancel</button>
      </div>
    </form>
    <hr class="mx-0" style="width:40px" />
    <div class="acct-info__date">
      <p>Created: {{ info.created }}</p>
      <p>Last modified: {{ info.last_modified }}</p>
      <p>Last used: {{ info.last_used }}</p>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "AcctInfo",
  props: ['info'],
  data() {
    return {
      isPass: false,
      isUser: false,
      isEdit: false,
      isShow: false,
      isError: false,
      inputForm: { username: '', password: '' },
      inputType: 'password',
    }
  },

  beforeUpdate() {
    for (let input in this.inputForm)
      this.inputForm[input] = this.info[input]
  },
  watch: {
    info(newData, oldData) {
      if (newData.id != oldData.id) this.resetData()
    }
  },
  methods: {
    toClipboard(info, bool) {
      this[bool] = true
      navigator.clipboard.writeText(info)
        .then(setTimeout(() => { this[bool] = false }, 4000))
    },
    editAcct(acctId) {
      // this.isError = this.inputForm.password == '' ? true
      //   : store.editAcct(id, this.inputForm)      
      if (this.inputForm.password == '') {
        this.isError = true
      } else {
        this.$emit('fetch', store.editAcct(acctId, this.inputForm))
      }
    },
    onEdit(acctId) {
      this.isEdit = !this.isEdit
      this.isError = false
      this.$emit('fetch', store.getIndexOfAcct(acctId))
    },
    removeAcct(acctId) {
      store.removeAcct(acctId)
      this.$emit('fetch')
    },
    showPassword() {
      this.isShow = !this.isShow
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    },
    resetData() {
      Object.assign(this.$data, this.$options.data())
    }
  }
};
</script>

<style>
/* #acct-info {
  padding: 3rem 3rem;
} */

@media (max-width: 768px) {
  #acct-info {
    padding: 1.5rem 1.5rem;
  }
}

.acct-info__header > button {
  border: none;
  border-radius: 2px;
  color: #343a40;
  background-color: #f8f9fa;
}

.acct-info__date > p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}
</style>
