<template>
  <transition name="slide-fadeY" mode="out-in" appear>
    <section class="section-info">
      <header class="header-info">
        <BaseIcon icon="globe" class="icon-lg" />
        <h1 class="heading-primary">
          <span class="heading-primary-main">{{ testDomain }}</span>
          <transition name="slide-fadeX" mode="out-in">
            <span v-if="!onEdit()" key="login" class="heading-primary-sub">
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
      <form class="form-info">
        <NeumorpInput
          id="website"
          v-model="account.url"
          type="text"
          label="Website"
          readonly>
          <BaseIcon icon="globe" class="input-type-icon" />
        </NeumorpInput>
        <div>
          <NeumorpInput
            id="username"
            type="text"
            label="Username"
            v-model="account.username"
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
            v-model="account.password"
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
          <router-view
            v-if="account.dates"
            :account="account.dates"
            @submit=""
            @cancel="$router.go(-1)" />
        </transition>
      </form>
      <BaseModal ref="baseModal">
        <template #header>Remove this account?</template>
        <template #paragraph>This cannot be undone</template>
        Remove
      </BaseModal>
    </section>
  </transition>
</template>

<script>
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Account',
  components: { BaseModal, NeumorpInput, NeumorpButton },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isEdit: true,
      testDomain: '',
    }
  },
  created() {
    this.$store.dispatch('getAccount', this.id)
  },
  beforeUpdate() {
    this.$store.dispatch('getAccount', this.id)
  },
  watch: {
    // BUGS: sometime the return is empty
    account(val) {
      this.testDomain =
        val.domain.charAt(0).toUpperCase() +
        val.domain.slice(1, val.domain.indexOf('.'))
    },
  },
  computed: {
    ...mapState({
      account: (state) => state.account.account,
    }),
  },
  methods: {
    // NOTE: only 1 use this fn()
    onEdit() {
      return this.$route.name == 'account-edit' ? true : false
    },
    toClipboard(text, el) {
      el.$el.classList.add('copy')
      navigator.clipboard.writeText(text).then(
        setTimeout(() => {
          el.$el.classList.remove('copy')
        }, 4000)
      )
    },
    deleteAccount(id) {
      this.$refs.baseModal.confirm().then((res) => {
        if (res) {
          if (this.$store.getters.accountCount == 1) {
            this.$router.replace({ name: 'account-create' })
          } else {
            this.$router.replace({
              name: 'account-info',
              params: { id: this.$store.getters.getActiveId(id) },
            })
          }
          this.$refs.baseModal.cancel(false)
          this.$store.dispatch('deleteAccount', id)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
