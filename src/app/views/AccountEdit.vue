<template>
  <form class="acct-edit-form">
    <!-- ERROR: v-model -->
    <NeumorpButton v-model="account.url">
      <BaseIcon icon="globe" class="input-type-icon" />
    </NeumorpButton>
    <!-- <BaseInput v-model="account.url" label="Website" readonly /> -->
    <BaseInput v-model="formData.username" icon="user" label="Username" />
    <BaseInput
      v-model="formData.password"
      label="Password"
      icon="lock"
      :type="'password'"
      maxlength="22" />
    <!-- EDIT BUTTONS -->
    <div class="buttons-container">
      <button
        @click="animatePressed(account.id, $event)"
        type="submit"
        class="btn-lg btn-save">
        Save
      </button>
      <button
        @click="animatePressed($event)"
        type="button"
        class="btn-lg btn-cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import BaseInput from '../components/base/BaseInput.vue'
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'

export default {
  name: 'AccountEdit',
  components: {
    BaseInput,
    NeumorpButton,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
    // refModal: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      hasError: false,
      formData: { username: '', password: '' },
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
  created() {
    this.initFormData()
  },
  computed: {
    formDataWatch() {
      return !Object.values(this.formData).every((value, index) => {
        return value === this.account[Object.keys(this.formData)[index]]
      })
    },
  },
  methods: {
    animatePressed(event, id) {
      event.target.classList.toggle('active')

      setTimeout(() => {
        event.target.classList.toggle('active')
        if (event.target.type == 'submit') {
          // ERROR
          return this.updateAccount(id)
        }
        this.$router.go(-1)
      }, 350)
    },
    initFormData() {
      for (let prop in this.formData) this.formData[prop] = this.account[prop]
    },
    updateAccount(id) {
      if (this.formData.password == '') {
        this.hasError = true
      } else {
        const accountObj = {
          ...this.formData,
          accountId: id,
        }
        this.$store.dispatch('updateAccount', accountObj)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.acct-edit-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.btn-save {
  // color: $color-secondary;
  border: 0.0625rem solid #d1d9e6;
}

.btn-cancel {
  // color: $color-dark-grey;
}
</style>
