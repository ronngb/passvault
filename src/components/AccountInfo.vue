<template>
  <!-- Need to change the attr. ID, Class, name conflict(acct-info) -->
  <div id="acct-info">
    <div class="acct-info_header d-flex align-items-center">
      <!-- this line will new component will be place -->
      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="mr-2" />
        {{ info.domain }}
      </h4>

      <button v-if="!isEdit" @click="onEdit(info.id)" type="button"
              class="btn btn-default btn-light mx-1">
        <font-awesome-icon icon="pencil-alt" class="mr-md-1" />
        <span class="text-muted">Edit</span>
      </button>
      <button @click="removeAcct(info.id)" type="button"
              class="btn btn-default mx-1">
        <font-awesome-icon icon="trash" class="mr-md-1" />
        <span class="text-muted">Remove</span>
      </button>
    </div>
    <hr />
    <!-- Website address Start -->
    <div class="mb-3">
      <label class="col-form-label">website address</label>
      <div>
        <a :href="info.url" style="font-size: 15px">{{ info.url }}</a>
      </div>
    </div>
    <!-- TODO: Prob. in column  -->
    <form class="acct-info__form">
      <!-- Username Start -->
      <div class="form-row">
        <div class="form-group col-8 col-md-5">
          <label>Username</label>
          <input type="text" :readonly="!isEdit"
                 :class="{'form-control-plaintext':!isEdit, 'form-control': isEdit}"
                 @input="$emit('update',[$event.target]),
                   (inputForm.username = $event.target.value)"
                 :value="info.username" :placeholder="hasUsername"
                 id="username" />
        </div>
        <div v-if="!isEdit" class="form-group col-4 col-md-5 align-self-end">
          <button :disabled="isUser"
                  @click="toClipboard(info.username, 'isUser')" type="button"
                  class="btn btn-default btn-light px-lg-4">
            <span v-if="isUser" class="text-muted">Copied!</span>
            <span v-if="!isUser" class="text-muted">Copy</span>
          </button>
        </div>
      </div>
      <!-- Password Start -->
      <div class="form-row">
        <div class="form-group col-8 col-md-5">
          <label>Password</label>
          <input :type="inputType" :readonly="!isEdit"
                 :class="{'is-invalid': isError,'form-control-plaintext': !isEdit, 'form-control': isEdit}"
                 @input="$emit('update',[$event.target]),
                   (inputForm.password = $event.target.value)"
                 :value="info.password" id="password" />
          <div v-if="isEdit && isError" class="invalid-feedback">
            Your password is required.
          </div>
        </div>
        <div v-if="!isEdit" class="form-group col-4 col-md-5 align-self-end">
          <button :disabled="isPass"
                  @click="toClipboard(info.password, 'isPass')" type="button"
                  class="btn btn-default btn-light px-lg-4">
            <span v-if="isPass" class="text-muted">Copied!</span>
            <span v-if="!isPass" class="text-muted">Copy</span>
          </button>
        </div>
      </div>
      <div v-if="isEdit" class="acct-edit_buttons">
        <button @click="editAcct(info.id)" type="button"
                class="btn btn-default mr-1">Save</button>
        <button @click="onEdit(info.id)" type="button"
                class="btn btn-default ml-1">Cancel</button>
      </div>
    </form>
    <hr class="mx-0" style="width:40px" />
    <div class="acct-info_date">
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
      isError: false,
      isIcon: 'eye',
      inputForm: { username: '', password: '' },
      inputType: 'password',
      hasUsername: ''
    }
  },

  beforeUpdate() {
    for (let input in this.inputForm)
      this.inputForm[input] = this.info[input]
  },
  watch: {
    info(newData, oldData) {
      if (newData.id != oldData.id) this.resetData()
      this.hasUsername = newData.username == '' ? '(no username)' : ''
    }
  },
  methods: {
    toClipboard(info, bool) {
      this[bool] = true
      navigator.clipboard.writeText(info)
        .then(setTimeout(() => { this[bool] = false }, 4000))
    },
    editAcct(acctId) {
      if (this.inputForm.password == '') {
        this.isError = true
      } else {
        store.editAcct(acctId, this.inputForm)
        this.onEdit(acctId)
      }
    },
    onEdit(acctId) {
      this.isEdit = !this.isEdit
      this.isError = false
      this.$emit('fetch', store.getIndexOfAcct(acctId))
    },
    removeAcct(acctId) {
      // place a condition that will return T or F base on the chosen event
      this.$EventBus.$emit('removeAcct', acctId)
      // store.removeAcct(acctId)
      // this.$emit('fetch')
    },
    showPassword() {
      this.isIcon = this.isIcon === 'eye' ? 'eye-slash' : 'eye'
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    },
    resetData() {
      Object.assign(this.$data, this.$options.data())
    }
  }
};
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
  border: 1px solid #dee2e6;
  border-radius: 5px;
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
