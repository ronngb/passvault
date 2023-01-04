<template>
  <transition name="fade-through" mode="out-in" appear>
    <section class="section-create">
      <header class="header-create">
        <BaseIcon icon="user-plus" class="icon-lg" />
        <h1 class="heading-primary">
          <span class="heading-primary-main">New Account</span>
          <span class="heading-primary-sub">Create</span>
        </h1>
      </header>
      <div class="seperator"></div>
      <form class="form-create" autocomplete="off" @click.prevent>
        <NeumorpInput
          id="website"
          type="text"
          label="Website"
          :invalid="errors[0]"
          v-model="acctData.url">
          <BaseIcon icon="globe" class="input-type-icon" />
          <span class="website-tooltip">
            Make sure to match the exact address of the website
          </span>
        </NeumorpInput>
        <NeumorpInput
          id="username"
          type="text"
          label="Username"
          :invalid="errors[1]"
          v-model="acctData.username">
          <BaseIcon icon="user" class="input-type-icon" />
        </NeumorpInput>
        <NeumorpInput
          id="password"
          type="password"
          label="Password"
          :invalid="errors[2]"
          v-model="acctData.password"
          maxlength="22">
          <BaseIcon icon="lock" class="input-type-icon" />
        </NeumorpInput>
        <div>
          <NeumorpButton
            type="button"
            class="btn-submit btn-contained"
            @click="submitForm">
            Save
          </NeumorpButton>
          <NeumorpButton
            type="button"
            class="btn-danger btn-contained"
            @click="$router.go(-1)">
            Cancel
          </NeumorpButton>
        </div>
      </form>
      <BaseModal ref="discardModal">
        <template #header>Discard unsaved changes?</template>
        <template #paragraph>All unsaved changes will be lost.</template>
        Discard
      </BaseModal>
    </section>
  </transition>
</template>
<script>
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AccountCreate',
  components: { BaseModal, NeumorpInput, NeumorpButton },
  data() {
    return {
      errors: [],
      guard: [0, 0, 0],
      valid: [0, 0, 0],
      acctData: this.initAccountObj(),
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.validateData('guard')) {
      this.$refs.discardModal
        .initial()
        .then((res) => next())
        .catch((err) => next(false))
    } else next()
  },
  computed: {
    sanitizeUrl() {
      const regex = /(http(s?)):\/\/|ww(w|3)./gi
      return this.acctData.url.replace(regex, '')
    },
    appendUrl() {
      let scheme = 'https://'
      let url = this.acctData.url
      return url ? (url.indexOf(scheme) == -1 ? scheme.concat(url) : url) : url
    },
  },
  methods: {
    ...mapActions(['addToast', 'storeAccount']),
    initAccountObj() {
      let date = new Date()

      return {
        url: '',
        username: '',
        password: '',
        favicon: '',
        dates: {
          created: date.toISOString(),
          last_modified: date.toISOString(),
        },
      }
    },
    validateData(arr) {
      let props = ['url', 'username', 'password']

      for (let prop of props) {
        if (this.acctData[prop] == '') this[arr][props.indexOf(prop)] += 1
        else this[arr][props.indexOf(prop)] = 0
      }

      return arr == 'guard'
        ? this[arr].includes(0)
        : this[arr].reduce((a, b) => a + b, 0)
    },
    submitForm() {
      if (!this.validateData('valid')) {
        this.storeAccount({
          ...this.acctData,
          url: this.appendUrl,
          domain: this.sanitizeUrl,
        })
          .then((res) => {
            this.acctData = this.initAccountObj()
            this.$router.push({
              name: 'account-detail',
              params: { id: res },
            })

            this.addToast({
              type: 'success',
              task: 'added',
              message: `Successfully added new account`,
            })
          })
          .catch((err) => console.log(err))
      } else this.errors = this.valid.slice(0)
    },
  },
}
</script>

<style lang="scss" scoped>
.website-tooltip {
  font-family: $nunito-sans;
  width: 190px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: -73%;
  margin-top: -40px;
  padding: 1.5rem;
  color: white;
  background-color: $tertiary-color;
  border-radius: 25px;
  font-weight: 700;
  opacity: 0;
  transform: translateX(10px);
  transition: opacity 200ms ease-out, transform 200ms ease-out;

  &::before {
    content: '';
    top: 40px;
    margin-top: -15px;
    position: absolute;
    border-width: 15px !important;
    inset-inline-end: 100%;
    border: solid transparent;
    border-right-color: $tertiary-color;
  }
}
</style>
