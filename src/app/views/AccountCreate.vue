<template>
  <transition name="scale-fade" mode="out-in" appear>
    <section>
      <header class="acct-create-header">
        <BaseIcon :icon="'user-plus'" :indefault="false" />
        <h1 class="primary-heading">
          <span class="primary-heading-main">New Account</span>
          <span class="primary-heading-sub">Create</span>
        </h1>
        <div class="seperator"></div>
      </header>
      <form @click.prevent="">
        <BaseInput
          v-model="acctData.url"
          :valid="valids[0]"
          :invalid="errors[0]"
          label="Website"
          icon="globe" />
        <BaseInput
          v-model="acctData.username"
          :valid="valids[1]"
          :invalid="errors[1]"
          label="Username"
          icon="user" />
        <BaseInput
          v-model="acctData.password"
          :valid="valids[2]"
          :invalid="errors[2]"
          label="Password"
          :type="'password'"
          icon="lock"
          maxlength="22" />
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
import BaseInput from '../components/base/BaseInput.vue'
import BaseModal from '../components/base/BaseModal.vue'
import AcctService from '@/app/services/AcctService'
import { neumorpMixin } from '@/app/mixins/neumorpMixin.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AccountCreate',
  components: { BaseInput, BaseModal },
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
svg {
  font-size: 4.48rem !important;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(497.6px - 57.8px);
}

button:nth-child(1) {
  color: $tertiary-color;
}

.acct-create-header {
  display: flex;
  gap: 5px 8px;
  flex-wrap: wrap;
  align-items: center;
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
