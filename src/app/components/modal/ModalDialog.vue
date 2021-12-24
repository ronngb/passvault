<template>
  <div class="dialog-confirm center" :class="{ active: isShow }">
    <div class="">
      <font-awesome-icon icon="exclamation-circle" style="font-size: 3.2em" />
    </div>
    <div class="dialog-title">
      <slot name="title">Discard unsaved changes?</slot>
    </div>
    <div class="dialog-description">
      <slot name="description">All unsaved changes will be lost.</slot>
    </div>
    <!-- <div class="dialog-title">Remove this Account?</div>
    <div class="dialog-description">This action cannot be undone.</div> -->
    <div class="confirm-btn">
      <!-- <button type="button" @click="isConfirm = true">Save</button> -->
      <!-- <button type="button" @click="isConfirm = false">Cancel</button> -->
      <button type="button" @click="resPromise(true)">Discard</button>
      <!-- TODO: remove the current value of @click Cancel replace with -->
      <button type="button" @click="isShow = false">Cancel</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalDialog',
  data() {
    return {
      isShow: false,
      isConfirm: '',
      acctId: '',
      addObj: {},
      resPromise: '',
    }
  },
  created() {
    this.$EventBus.$on('removeAcct', (acctId) => {
      this.removeAcct(acctId)
    })
  },

  methods: {
    // TODO: create a function that if discard the modal will close and clear data
    discard() {
      return new Promise((resolve, reject) => {
        this.isShow = true
        this.resPromise = resolve
      })
    },
    cancelEvent() {
      this.$store.commit('SHOW_MODAL')
    },
    removeAcct(acctId) {
      this.isShow = true
      this.acctId = acctId
    },
  },
}
</script>

<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dialog-confirm {
  width: 350px;
  height: 300px;
  padding: 30px 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 2;
  text-align: center;
  opacity: 0;
  top: -200%;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 300ms ease-in-out, top 1000ms ease-in-out,
    transform 1000ms ease-in-out;
}
.dialog-confirm.active {
  opacity: 1;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
}
.dialog-confirm .icon {
  margin: 5px 0px;
  width: 50px;
  height: 50px;
  border: 2px solid #34f234;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  line-height: 60px;
}
.dialog-confirm .dialog-title {
  margin: 5px 0px;
  font-size: 30px;
  font-weight: 600;
}
.dialog-confirm .dialog-description {
  color: #222;
  font-size: 15px;
  padding: 5px;
}
.dialog-confirm .confirm-btn {
  margin-top: 15px;
}
.dialog-confirm .confirm-btn button {
  padding: 10px 20px;
  /* background: #111;
  color: #f5f5f5;
  border: 2px solid #111; */
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
.dialog-confirm .confirm-btn button:hover {
  color: #111;
  background: #f5f5f5;
}
.dialog-confirm > div {
  position: relative;
  top: 10px;
  opacity: 0;
}
.dialog-confirm.active > div {
  top: 0px;
  opacity: 1;
}
.dialog-confirm.active .icon {
  transition: all 300ms ease-in-out 250ms;
}
.dialog-confirm.active .title {
  transition: all 300ms ease-in-out 300ms;
}
.dialog-confirm.active .description {
  transition: all 300ms ease-in-out 350ms;
}
.dialog-confirm.active .confirm-btn {
  transition: all 300ms ease-in-out 400ms;
}
</style>
