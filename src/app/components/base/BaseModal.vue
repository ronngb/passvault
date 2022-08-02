<template>
  <transition name="scale-fade" mode="out-in" appear>
    <div class="modal" v-if="modalShow">
      <div class="modal-backdrop"></div>
      <div class="modal-confirm">
        <div class="modal-body">
          <header>
            <BaseIcon :icon="'exclamation'" :indefault="false" />
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
            <button
              type="button"
              class="btn-danger"
              v-click:contained="() => resPromise(true)">
              <slot></slot>
            </button>
            <button
              type="button"
              class="btn-cancel"
              v-click:contained="() => cancel(false)">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import { neumorpMixin } from '@/app/mixins/neumorpMixin.js'

export default {
  name: 'ModalDialog',
  mixins: [neumorpMixin],
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
svg {
  font-size: 4rem;
}

button:nth-child(1) {
  color: $danger;
}

.modal {
  &-backdrop {
    position: fixed;
    inset: 0;
  }
  &-confirm {
    width: 350px;
    height: 300px;
    padding: 30px 20px;
    background: $color-primary-bg;
    border-radius: 10px;
    text-align: center;
    @extend .center;
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

.contained-btn {
  @include neumorp-button(9.5rem, 3.7rem, 10px, $contained);
  margin: 0 10px;
  font-weight: bold;
  &.clicked {
    animation: buttonClicked 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  }
}

@include neumorp-keyframes($contained);

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// Transition Class
.scale-fade-enter-active {
  @extend .center;
}
</style>
