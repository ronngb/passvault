<template>
  <div>
    <div :class="{ 'modal-dialog-backdrop': isActive }"></div>
    <div class="modal-dialog center" :class="{ active: isActive }">
      <div class="modal-dialog-body" :class="{ active: isActive }">
        <div class="icon-container">
          <font-awesome-icon
            :icon="['fas', 'exclamation']"
            class="exclamation-icon" />
        </div>
        <p class="dialog-title">
          <template v-if="toRemove">Remove this Account?</template>
          <template v-else>Discard unsaved changes?</template>
        </p>
        <p class="dialog-description">
          <template v-if="toRemove">This action cannot be undone</template>
          <template v-else>All unsaved changes will be lost.</template>
        </p>
        <div class="button-container">
          <button
            type="button"
            class="btn-lg btn-danger"
            @click="animatePressed(true, $event)">
            <template v-if="toRemove">Remove</template>
            <template v-else>Discard</template>
          </button>
          <button
            type="button"
            class="btn-lg"
            @click="animatePressed(false, $event)">
            Cancel
          </button>
        </div>
      </div>
    </div>
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
    animatePressed(res, event) {
      event.target.classList.toggle('active')

      setTimeout(() => {
        event.target.classList.toggle('active')
        if (res) {
          this.resPromise(res)
        }
        this.isActive = false
      }, 350)
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -175px;
}
.modal-dialog {
  width: 350px;
  height: 300px;
  padding: 30px 20px;
  background: $color-primary-bg;
  border-radius: 10px;
  text-align: center;
  opacity: 0;
  z-index: 11;
  transform: scale(0.8);
  transition: opacity 75ms ease;
  box-shadow: -4px -4px 6px rgba(255, 255, 255, 0.5),
    4px 4px 6px rgba(163, 177, 198, 0.6);
}

.modal-dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.modal-dialog.active {
  opacity: 1;
  transform: scale(1);
  transition-property: opacity, transform;
  transition-duration: 45ms, 150ms;
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.43, 1.19);
}

.modal-dialog-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.icon-container {
  width: 50px;
  height: 50px;
  padding: 8px 0;
  border-radius: 50%;
  transform: scale(0);
  box-shadow: -4px -4px 6px rgba(255, 255, 255, 0.5),
    4px 4px 6px rgba(163, 177, 198, 0.6);
}

.modal-dialog-body > div {
  transform: scale(0);
}

.modal-dialog-body > p {
  transform: translateY(20px);
  opacity: 0;
}

.modal-dialog-body .button-container > button {
  transform: scale(0);
}

.modal-dialog-body.active > div {
  transform: scale(1);
}

.modal-dialog-body.active > p {
  transform: translateY(0);
  opacity: 1;
}

.modal-dialog-body.active .button-container > button {
  transform: scale(1);
}

.modal-dialog-body.active .icon-container {
  transition: all 150ms ease-in-out 250ms;
}

.modal-dialog-body.active .dialog-title {
  transition: all 150ms ease-in-out 400ms;
}

.modal-dialog-body.active .dialog-description {
  transition: all 150ms ease-in-out 550ms;
}

.modal-dialog-body.active .btn-lg {
  transition: all 150ms ease-in-out 700ms;
}

.exclamation-icon {
  font-size: 2em;
  color: $color-light-grey;
}

.dialog-title {
  font-size: 30px;
  font-weight: 600;
  color: #546e7a;
}
.dialog-description {
  color: #546e7a;
  font-size: 15px;
}

.btn-danger {
  color: $color-danger;
}
</style>
