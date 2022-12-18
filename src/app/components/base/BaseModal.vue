<template>
  <transition name="fade" mode="out-in">
    <div class="modal" v-if="modalShow">
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <BaseIcon icon="exclamation" class="icon-lg" />
        </div>
        <div class="modal-body">
          <p class="modal-text">
            <span class="modal-text-main"><slot name="header"></slot></span>
            <span class="modal-text-sub"><slot name="paragraph"></slot></span>
          </p>
        </div>
        <div class="modal-footer">
          <NeumorpButton
            type="button"
            class="btn-submit btn-contained"
            @click="confirm()">
            <slot></slot>
          </NeumorpButton>
          <NeumorpButton
            type="button"
            class="btn-danger btn-contained"
            @click="cancel()">
            Cancel
          </NeumorpButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import NeumorpButton from '../neumorp/NeumorpButton.vue'

export default {
  name: 'ModalDialog',
  components: { NeumorpButton },
  data() {
    return {
      modalShow: false,
      resPromise: '',
      rejPromise: '',
    }
  },
  methods: {
    initial() {
      return new Promise((resolve, reject) => {
        this.modalShow = true
        this.resPromise = resolve
        this.rejPromise = reject
      })
    },
    confirm() {
      this.modalShow = false
      this.resPromise(true)
    },
    cancel() {
      this.modalShow = false
      this.rejPromise(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  width: 350px;
  height: 300px;
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;
  background: $primary-bg-color;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  margin: -150px 0 0 -175px;
  box-shadow: 4px 4px 6px rgba(163, 177, 198, 0.6),
    -4px -4px 6px rgba(255, 255, 255, 0.6);

  &-backdrop {
    z-index: -10;
    position: fixed;
    inset: 0;
  }

  &-text {
    &-main {
      display: inline-block;
      font-size: 3rem;
      color: $primary-color;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &-sub {
      display: inline-block;
      font-size: 1.6rem;
      color: $primary-color;
    }
  }

  &-footer {
    padding: 15px 0;
  }
}
</style>
