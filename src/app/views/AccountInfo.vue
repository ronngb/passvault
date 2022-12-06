<template>
  <section class="section-info">
    <header class="header-info">
      <BaseIcon icon="globe" class="icon-lg" />
      <h1 class="heading-primary">
        <span class="heading-primary-main">{{ account.domain }}</span>
        <transition name="slide-fadeX" mode="out-in">
          <span v-if="!routeCheck()" key="login" class="heading-primary-sub">
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
        <NeumorpButton type="button" class="btn-danger btn-mini" @click="">
          <BaseIcon icon="trash-alt" class="icon-sm" />
        </NeumorpButton>
        <!-- TODO: TOBE REMOVE 2/12 -->
        <!-- @click="$router.push({ name: 'account-edit' })" -->
        <!--  <button :class="{ 'btn-sm': true, active: routeCheck }" @click="">
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            class="icons pencil-icon" />
        </button> -->
        <!-- TODO: TOBE REMOVE 2/12 -->
        <!-- <button :class="{ 'btn-sm': true }" @click="deleteAccount(account.id)">
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="icons trash-icon" />
        </button> -->
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
      <!-- TODO: TOBE REMOVE 2/12 -->
      <!-- <BaseInput v-model="account.url" label="Website" readonly /> -->
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
          type="button"
          class="btn-info btn-mini"
          @click="toClipboard(account.username, $event)">
          <BaseIcon icon="copy" class="icon-sm" />
        </NeumorpButton>
        <!-- TODO: TOBE REMOVE 2/12 -->
        <!-- <button
          class="btn-sm"
          type="button"
          @click="toClipboard(account.username, $event)">
          <font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
        </button> -->
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
          type="button"
          class="btn-info btn-mini"
          @click="toClipboard(account.password, $event)">
          <BaseIcon icon="copy" class="icon-sm" />
        </NeumorpButton>
        <!-- TODO: TOBE REMOVE 2/12 -->
        <!-- <button
          class="btn-sm"
          type="button"
          @click="toClipboard(account.password, $event)">
          <font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
        </button> -->
      </div>
      <!-- BUGS: transition not working -->
      <transition name="slide-fadeX" mode="out-in">
        <router-view
          v-if="account.dates"
          :account="account.dates"
          @submit=""
          @cancel="$router.go(-1)" />
      </transition>
    </form>
  </section>
</template>

<script>
// TODO: TOBEREMOVE 5/12
// import BaseInput from '../components/base/BaseInput.vue'
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Account',
  components: { NeumorpInput, NeumorpButton },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isEdit: true,
    }
  },
  created() {
    this.$store.dispatch('getAccount', this.id)
  },
  beforeUpdate() {
    this.$store.dispatch('getAccount', this.id)
  },
  computed: {
    ...mapState({
      account: (state) => state.account.account,
    }),
  },
  methods: {
    routeCheck() {
      if (this.$route.name == 'account-edit') {
        return true
      }
      return false
    },
    // deleteAccount(id) {
    //   this.refModal.modalOn(true).then((res) => {
    //     if (res) {
    //       this.$router.replace({
    //         name: 'detail',
    //         params: { id: this.getActiveIndex(id) },
    //       })
    //       this.$store.dispatch('deleteAccount', id)
    //     }
    //   })
    // },
  },
}
/*

        CODE THE LOGIC

         * AccountInfo

            - make the acct name capital the 1st letter & remove the .com

            - place tooltip when hover on buttons

            - set the Created & Modified date formal

            - make the copy functional if use the button should be gone for 5 sec

            - set the Icon in account*/
</script>

<style lang="scss" scoped>
.slide-fadeX-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fadeX-enter-active {
  transition: opacity 140ms ease-out 60ms, transform 200ms ease-in-out;
}

.slide-fadeX-leave-active {
  transition: opacity 30ms ease-in, transform 200ms ease-out;
}

.slide-fadeX-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
// .slide-fade-enter {
//   transform: translateX(10px);
//   opacity: 0;
// }

// .slide-fade-enter-active {
//   transition: opacity 210ms cubic-bezier(0, 0, 0.2, 1) 90ms,
//     transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
// }

// .slide-fade-leave-active {
//   transition: opacity 90ms cubic-bezier(0.4, 0, 1, 1),
//     transform 300ms cubic-bezier(0, 0, 0.2, 1);
// }

// .slide-fade-leave-to {
//   transform: translateX(-10px);
//   opacity: 0;
// }
</style>
