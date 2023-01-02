<template>
  <div class="toast-item">
    <div class="toast-icon" :class="iconAlertClass">
      <BaseIcon :icon="iconAlertType" :class="`${iconAlertType}-icon`" />
    </div>
    <div class="toast-content">
      <strong class="toast-heading">
        {{ toast.task }}
      </strong>
      <p class="toast-message">{{ toast.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },

  mounted() {
    this.timeout = setTimeout(() => this.removeToast(this.toast), 3000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    iconAlertType() {
      return this.toast.type == 'success' ? 'check' : 'info'
    },
    iconAlertClass() {
      return `toast-icon--${this.toast.type}`
    },
  },
  methods: mapActions(['removeToast']),
}
</script>

<style lang="scss" scoped>
.toast {
  &-item {
    display: flex;
    align-items: center;
    min-width: 37rem;
    margin: 1rem 0;
    border-radius: 10px;
    padding: 1.5rem 1.5rem;
    background-color: $primary-bg-color;
    box-shadow: 4px 4px 6px rgba($bot-shadow-color, 0.6),
      -4px -4px 6px rgba($top-shadow-color, 0.6);
  }
  &-icon {
    position: relative;
    display: inline-block;
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
    &--success {
      background-color: rgba(#bfffbf, 0.4);
      box-shadow: inset -2px -2px 2px rgba($top-shadow-color, 0.5),
        inset 2px 2px 2px rgba($bot-shadow-color, 0.6);
    }
    &--info {
      box-shadow: inset -1px -1px 1px rgba($top-shadow-color, 0.5),
        inset 2px 2px 2px rgba($bot-shadow-color, 0.6);
      background-color: rgba(#bfbfff, 0.4);
    }
  }

  &-content {
    margin: 0 1rem;
  }

  &-heading {
    font-size: 1.8rem;
    text-transform: capitalize;
    color: $primary-color;
  }

  &-message {
    font-family: $nunito-sans;
    color: $primary-color;
    font-size: 1.5rem;
    margin: 0;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
