<template>
  <transition name="scale-fade" mode="out-in" appear>
    <div class="modal" v-if="modalShow">
      <div class="modal-backdrop"></div>
      <div class="modal-confirm">
        <div class="modal-body">
          <header>
            <BaseIcon icon="exclamation" class="icon-lg" />
          </header>
          <section>
            <h2 class="modal-header">
              <slot name="header"></slot>
            </h2>
            <p class="modal-paragraph">
              <slot name="paragraph"></slot>
            </p>
          </section>
          <footer>
            <NeumorpButton
              type="button"
              class="btn-danger btn-contained"
              @click="resPromise(true)">
              <slot></slot>
            </NeumorpButton>
            <NeumorpButton
              type="button"
              class="btn-contained"
              @click="cancel(false)">
              Cancel
            </NeumorpButton>
          </footer>
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
    }
  },
  methods: {
    confirm(toRemove = false) {
      return new Promise((resolve, reject) => {
        this.modalShow = true
        this.resPromise = resolve
      })
    },
    cancel(res) {
      this.modalShow = false
      this.resPromise(res)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  &-backdrop {
    position: fixed;
    inset: 0;
  }
  &-confirm {
    width: 350px;
    height: 300px;
    padding: 30px 20px;
    border-radius: 10px;
    text-align: center;
    background: $color-primary-bg;
    @extend %align-center;
    @include neumorp-shadow(2);
  }
  &-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  &-header {
    font-size: 3rem;
    color: $primary-color;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-paragraph {
    font-size: 1.6rem;
    color: $primary-color;
  }
}

%align-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// Transition Class
.scale-fade-enter-active {
  @extend %align-center;
}
</style>
