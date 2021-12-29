<template>
  <div class="dialog-confirm center" :class="{ active: isActive }">
    <slot>
      <div class="">
        <font-awesome-icon icon="exclamation-circle" style="font-size: 3.2em" />
      </div>
      <div class="dialog-title">
        <template v-if="toRemove">Remove this Account?</template>
        <template v-else>Discard unsaved changes?</template>
      </div>
      <div class="dialog-description">
        <template v-if="toRemove">This action cannot be undone</template>
        <template v-else>All unsaved changes will be lost.</template>
      </div>

      <div class="confirm-btn">
        <button type="button" @click="responseTo(true)">
          <template v-if="toRemove">Remove</template>
          <template v-else>Discard</template>
        </button>
        <button type="button" @click="isActive = false">Cancel</button>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'ModalDialog',
  data() {
    return {
      toRemove: false,
      isActive: false,
      resPromise: '',
    }
  },
  methods: {
    modalOn(toRemove = false) {
      return new Promise((resolve, reject) => {
        this.isActive = true
        this.toRemove = toRemove
        this.resPromise = resolve
      })
    },
    responseTo(res) {
      this.resPromise(true)
      this.isActive = false
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
