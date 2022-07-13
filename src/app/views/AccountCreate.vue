<template>
  <transition name="scale-fade" mode="out-in" appear>
    <section class="acct-create-section">
      <header class="acct-create-header">
        <font-awesome-icon
          :icon="['fas', 'user-plus']"
          class="user-plus-icon" />
        <hgroup class="acct-create-heading">
          <h1 class="main-heading">New Account</h1>
          <h2 class="sub-heading">Create</h2>
        </hgroup>
        <div class="seperator"></div>
      </header>
      <form action="" @click.prevent="">
        <BaseInput
          v-model="formData.url"
          :valid="valids[0]"
          :invalid="errors[0]"
          label="Website"
          icon="globe" />
        <BaseInput
          v-model="formData.username"
          :valid="valids[1]"
          :invalid="errors[1]"
          label="Username"
          icon="user" />
        <BaseInput
          v-model="formData.password"
          :valid="valids[2]"
          :invalid="errors[2]"
          label="Password"
          :type="'password'"
          icon="lock"
          maxlength="22" />
        <div>
          <button type="submit" class="btn-lg btn-save" @click="animatePressed">
            Save
          </button>
          <button
            type="button"
            @click="animatePressed"
            class="btn-lg btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </section>
  </transition>
</template>
<script>
import BaseInput from '../components/base/BaseInput.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AccountCreate',
  components: { BaseInput },
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
      valids: [],
      inputType: 'password',
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.formDataWatch) {
      this.refModal.modalOn().then((res) => {
        return res ? next() : next(false)
      })
      return next(false)
    }
    next()
  },
  computed: {
    ...mapState({ account: 'account' }),
    formDataWatch() {
      return !Object.values(this.formData).every((value) => value === '')
    },
  },
  methods: {
    animatePressed(event) {
      event.target.classList.toggle('active')

      setTimeout(() => {
        event.target.classList.toggle('active')
        if (event.target.type == 'submit') {
          return this.submitForm()
        }
        this.$router.go(-1)
      }, 350)
    },
    submitForm() {
      this.errors = []
      this.valids = []

      Object.values(this.formData).forEach((obj, index) => {
        obj == 0 ? this.errors.push(1) : this.errors.push(0)
        this.valids[index] = !this.errors[index]
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

<style lang="scss" scoped>
.acct-create-section {
  display: grid;
  grid-template-columns: calc(100vw - 32px);
  grid-template-rows: max-content 1fr;
  height: 100%;
  max-width: 490px;
  // width: max-content;
}

.acct-create-header {
  display: flex;
  gap: 5px 8px;
  flex-wrap: wrap;
  align-items: center;
}

.user-plus-icon {
  font-size: 2.8em;
  color: $color-light-grey;
}

.acct-create-heading {
  line-height: 0.9;
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

.acct-create-section form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* align-content: center;*/
  /*border: 1px solid black;*/
  /*margin: auto 0;*/
}

.btn-save {
  color: $color-secondary;
  border: 0.0625rem solid #d1d9e6;
}

.btn-cancel {
  color: $color-dark-grey;
}

.scale-fade-enter {
  opacity: 0;
  transform: scale(0.8);
}

.scale-fade-enter-active {
  transition-delay: 360ms;
  transition-property: opacity, transform;
  transition-duration: 45ms, 105ms;
}
.scale-fade-leave-active {
  transition: opacity 75ms linear;
}

.scale-fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 1200px) {
  .acct-create-section {
    grid-template-columns: 1fr;
  }
}
</style>
