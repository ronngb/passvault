<template>
  <transition name="slide-fadeY" mode="out-in" appear>
    <section class="section-detail">
      <header class="header-detail">
        <div class="icon-container">
          <img v-if="account.favicon" :src="account.favicon" />
          <BaseIcon v-else icon="globe" class="icon-lg globe-icon" />
        </div>
        <h1 class="heading-primary">
          <span class="heading-primary-main">{{ capitalizeDomain }}</span>
          <transition name="slide-fadeX" mode="out-in">
            <span
              v-if="$route.name != 'account-edit'"
              key="login"
              class="heading-primary-sub">
              Login
            </span>
            <span v-else key="edit" class="heading-primary-sub">Edit</span>
          </transition>
        </h1>
        <div class="button-group">
          <NeumorpButton
            type="button"
            class="btn-submit btn-mini"
            @click="$router.push({ name: 'account-edit' })">
            <BaseIcon icon="user-edit" class="icon-sm" />
          </NeumorpButton>
          <NeumorpButton
            type="button"
            class="btn-danger btn-mini"
            @click="deleteAccount(account.id)">
            <BaseIcon icon="trash-alt" class="icon-sm" />
          </NeumorpButton>
        </div>
      </header>
      <div class="seperator"></div>
      <form class="form-detail" autocomplete="off" @click.prevent>
        <div>
          <NeumorpInput
            id="website"
            v-model="account.domain"
            type="text"
            label="Website"
            readonly>
            <BaseIcon icon="globe" class="input-type-icon" />
          </NeumorpInput>
          <NeumorpButton
            ref="username"
            type="button"
            class="btn-dark btn-mini"
            @click="openLinkNewTab(account.url)">
            <BaseIcon icon="link" class="icon-sm" />
          </NeumorpButton>
        </div>
        <div>
          <NeumorpInput
            id="username"
            type="text"
            label="Username"
            v-model="formData.username"
            :invalid="validateObj.errors[1]"
            :readonly="$route.name != 'account-edit'">
            <BaseIcon icon="user" class="input-type-icon" />
          </NeumorpInput>
          <NeumorpButton
            ref="username"
            type="button"
            class="btn-info btn-mini"
            @click="toClipboard(account.username, $refs.username)">
            <BaseIcon icon="copy" class="icon-sm" />
          </NeumorpButton>
        </div>
        <div>
          <NeumorpInput
            id="password"
            type="password"
            label="Password"
            v-model="formData.password"
            :invalid="validateObj.errors[2]"
            maxlength="22"
            :readonly="$route.name != 'account-edit'">
            <BaseIcon icon="lock" class="input-type-icon" />
          </NeumorpInput>
          <NeumorpButton
            ref="password"
            type="button"
            class="btn-info btn-mini"
            @click="toClipboard(account.password, $refs.password)">
            <BaseIcon icon="copy" class="icon-sm" />
          </NeumorpButton>
        </div>
        <transition name="slide-fadeX" mode="out-in">
          <component
            :is="onEdit"
            v-if="account.dates"
            :account="account.dates"
            @submit="updateAccount()"
            @cancel="$router.go(-1)" />
        </transition>
      </form>
      <BaseModal ref="removeModal">
        <template #header>Remove this account?</template>
        <template #paragraph>This cannot be undone</template>
        Remove
      </BaseModal>
      <BaseModal ref="discardModal">
        <template #header>Discard unsaved changes?</template>
        <template #paragraph>All unsaved changes will be lost.</template>
        Disregard
      </BaseModal>
    </section>
  </transition>
</template>

<script>
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import OnEdit from '../components/detail/OnEdit.vue'
import OnDetail from '../components/detail/OnDetail.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Account',
  components: { BaseModal, NeumorpInput, NeumorpButton, OnEdit, OnDetail },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      formData: {
        id: '',
        username: '',
        password: '',
        dates: '',
      },
      validateObj: this.initGuardObj(),
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.validateObj.hasChange.includes(1)) {
      this.$refs.discardModal
        .initial()
        .then((res) => next())
        .catch((err) => {})
    } else next()
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    if (this.validateObj.hasChange.includes(1)) {
      this.$refs.discardModal
        .initial()
        .then((res) => {
          this.initFormObj()
          this.validateObj.reset()
          next()
        })
        .catch((err) => {
          next(false)
        })
    } else if (
      routeTo.name == 'account-edit' &&
      routeFrom.params.id != routeTo.params.id
    ) {
      next({
        name: 'account-detail',
        params: { id: routeTo.params.id },
      })
    } else next()
  },

  created() {
    this.getAccount(this.id)
  },
  mounted() {
    this.initFormObj()
  },
  watch: {
    account(value) {
      this.initFormObj()
    },
    formData: {
      deep: true,
      handler(props) {
        this.validateObj.reset(false)
        for (let prop in props) {
          if (!props[prop]) this.validateObj.hasErrors.push(1)
          else this.validateObj.hasErrors.push(0)

          if (props[prop] != this.account[prop])
            this.validateObj.hasChange.push(1)
          else this.validateObj.hasChange.push(0)
        }
      },
    },
  },
  computed: {
    ...mapState({ account: (state) => state.account.account }),
    onEdit() {
      return this.$route.name == 'account-detail' ? OnDetail : OnEdit
    },
    capitalizeDomain() {
      let value = this.account.domain
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1, value.indexOf('.'))
    },
  },
  methods: {
    ...mapActions(['addToast', 'getAccount']),
    initGuardObj() {
      return {
        hasErrors: [],
        hasChange: [],
        errors: [],
        reset(full = true) {
          this.hasErrors = []
          this.hasChange = []
          if (full) {
            this.errors = []
          }
        },
        setErrors() {
          this.errors = this.hasErrors
        },
      }
    },
    initFormObj() {
      for (let prop in this.formData) {
        this.formData[prop] = this.account[prop]
      }
    },
    openLinkNewTab(url) {
      window.open(url, '_blank')
    },
    toClipboard(text, el) {
      this.addToast({
        type: 'info',
        task: 'copied',
        message: `${el.$vnode.data.ref} copied to clipboard`,
      })
      el.$el.classList.add('copy')
      navigator.clipboard.writeText(text).then(
        setTimeout(() => {
          el.$el.classList.remove('copy')
        }, 4000)
      )
    },
    updateAccount() {
      if (!this.validateObj.hasErrors.includes(1)) {
        if (!this.validateObj.hasChange.includes(1)) {
          this.$router.go(-1)
        } else {
          this.$store
            .dispatch('updateAccount', this.formData)
            .then((res) => {
              this.validateObj.reset()
              this.$router.replace({
                name: 'account-detail',
                params: { id: this.formData.id },
              })

              this.addToast({
                type: 'success',
                task: 'update',
                message: `Successfully update ${this.capitalizeDomain} account`,
              })
            })
            .catch((err) => console.log(err))
        }
      } else this.validateObj.setErrors()
    },
    deleteAccount(id) {
      this.$refs.removeModal
        .initial()
        .then((res) => {
          if (this.$store.getters.accountCount == 1) {
            this.$router.replace({ name: 'account-create' })
          } else {
            this.addToast({
              type: 'success',
              task: 'remove',
              message: `Successfully remove the ${this.capitalizeDomain} account`,
            })

            this.$router.replace({
              name: 'account-detail',
              params: { id: this.$store.getters.getActiveId(id) },
            })
          }
          this.$store.dispatch('deleteAccount', id)
        })
        .catch((err) => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-container {
  position: relative;
  width: 4.48rem;
  height: 4.48rem;
  border-radius: 25%;
}

img {
  width: 100%;
  border-radius: 25%;
}
</style>
