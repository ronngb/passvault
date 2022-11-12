<template>
  <transition name="scale-fade" mode="out-in" appear>
    <section class="section-acct-create">
      <header class="header-acct-create">
        <BaseIcon icon="user-plus" :classes="['icon-lg']" />
        <h1 class="heading-primary">
          <span class="heading-primary-main">New Account</span>
          <span class="heading-primary-sub">Create</span>
        </h1>
      </header>
      <div class="seperator"></div>
      <form class="form-acct-create" @click.prevent>
        <NeumorpInput
          id="website"
          type="text"
          label="Website"
          :invalid="errors[0]"
          v-model="acctData.url">
          <BaseIcon icon="globe" :classes="['input-type-icon']" />
        </NeumorpInput>
        <NeumorpInput
          id="username"
          type="text"
          label="Username"
          :invalid="errors[1]"
          v-model="acctData.username">
          <BaseIcon icon="user" :classes="['input-type-icon']" />
        </NeumorpInput>
        <NeumorpInput
          id="password"
          type="password"
          label="Password"
          :invalid="errors[2]"
          v-model="acctData.password"
          maxlength="22">
          <BaseIcon icon="lock" :classes="['input-type-icon']" />
        </NeumorpInput>
        <div>
          <button
            type="submit"
            class="btn-save"
            v-click:contained="() => submitForm()">
            Save
          </button>
          <button
            type="button"
            v-click:contained="() => $router.go(-1)"
            class="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
      <BaseModal ref="baseModal">
        <template #header>Discard unsaved changes?</template>
        <template #paragraph>All unsaved changes will be lost.</template>
        Discard
      </BaseModal>
    </section>
  </transition>
</template>
<script>
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'
import BaseModal from '../components/base/BaseModal.vue'
import AcctService from '@/app/services/AcctService'
import { neumorpMixin } from '@/app/mixins/neumorpMixin.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AccountCreate',
  components: { BaseModal, NeumorpInput },
  mixins: [neumorpMixin],

  data() {
    return {
      errors: [],
      valids: [],
      inputType: 'password',
      acctData: this.initAccountObj(),
    }
  },
  // NOTE: same hook with AccountEdit
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.validateAcctData.includes(0)) {
      this.$refs.baseModal.confirm().then((res) => {
        return res ? next() : next(false)
      })
      return next(false)
    }
    next()
  },
  computed: {
    validateAcctData() {
      let tempArr = []
      const objKeys = ['url', 'username', 'password']

      Object.keys(this.acctData).forEach((key) => {
        if (objKeys.includes(key)) {
          this.acctData[key] == '' ? tempArr.push(1) : tempArr.push(0)
        }
      })
      return tempArr
    },
  },
  methods: {
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
    submitForm() {
      this.errors = this.validateAcctData
      if (!this.errors.includes(1)) {
        this.$store
          .dispatch('storeAccount', {
            ...this.acctData,
            domain: this.sanitizeUrl(),
          })
          .then((res) => {
            // TODO: call $router.push()
            this.acctData = this.initAccountObj()
          })
          .catch((err) => console.log(err))
      }
    },
    sanitizeUrl() {
      const regex = /(http(s?)):\/\/|ww(w|3)./gi

      return this.acctData.url.replace(regex, '')
    },

    // NOTE: autoAppend must be at input with @blur event
    autoAppend(url) {
      const scheme = 'https://'
      return url ? (url.indexOf(scheme) == -1 ? scheme.concat(url) : url) : url
    },
  },
}
</script>

<style lang="scss" scoped>
.section-acct-create {
  width: 500px;
}

.header-acct-create {
  display: flex;
  gap: 5px 8px;
  flex-wrap: wrap;
  align-items: center;
}

.seperator {
  height: 8px;
  width: 100%;
  margin-top: 0.6rem;
  border-radius: 50px;
  @include neumorp-shadow(2, inset);
}

.form-acct-create {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 1.2rem;
  height: calc(80vh - 57.8px);
}

button:nth-child(1) {
  color: $tertiary-color;
}

.contained-btn {
  @include neumorp-button(9.5rem, 3.7rem, 10px, $contained);
  margin: 0 10px;
  font-weight: bold;
  &.clicked {
    animation: buttonClicked 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  }
}

@include neumorp-keyframes($contained);

.scale-fade-enter {
  opacity: 0;
  transform: scale(0.8);
}

.scale-fade-enter-active {
  transition: opacity 45ms 350ms, transform 150ms 350ms ease-out;
}

.scale-fade-leave-active {
  transition: opacity 75ms ease-in;
}

.scale-fade-leave-to {
  opacity: 0;
}
</style>
