<template>
  <button v-click="() => $listeners.click.fns()" :class="classObj">
    <slot></slot>
  </button>
</template>

<script>
export default {
  directives: {
    click: {
      inserted(el, binding, vnode) {
        el.addEventListener('click', () => {
          setTimeout(() => binding.value(), 200)
        })
      },
    },
  },
  computed: {
    classObj() {
      return {
        btn: true,
        edit: this.$route.name == 'account-edit',
      }
    },
  },
}
</script>

<style lang="scss">
.btn {
  &-submit {
    color: $tertiary-color;
    &:focus {
      outline: none;
      text-shadow: $tertiary-color 1px 0px 15px;
    }
    &:hover > svg {
      color: inherit;
      transition: color 180ms ease-in-out 100ms;
    }
  }
  &-danger {
    color: $danger-color;
    &:focus {
      outline: none;
      text-shadow: $danger-color 1px 0px 15px;
    }
    &:hover > svg {
      color: inherit;
      transition: color 180ms ease-in-out 100ms;
    }
  }
  &-info {
    &:hover > svg {
      color: $info-color;
      transition: color 180ms ease-in-out 100ms;
    }
  }

  &-contained {
    width: 9.5rem;
    height: 3.7rem;
    border-radius: 10px;
    margin: 0 10px;
    font-weight: bold;
    @include neumorp-button-initial(contained);
    &:hover {
      opacity: 0.5;
      transition: opacity 200ms ease-out;
    }
    &:active {
      opacity: 1;
      @include neumorp-button-active(contained);
    }
  }

  &-float {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
    bottom: 30px;
    left: 20vw;
    position: fixed;

    @include neumorp-button-initial(float);
    &:hover {
      opacity: 0.5;
      transition: opacity 200ms ease-out;
    }
    &:active {
      opacity: 1;
      @include neumorp-button-active(float);
    }
  }

  &-mini {
    width: 36px;
    height: 36px;
    margin: 0 10px;
    border-radius: 32%;
    position: relative;
    border: 1px solid $primary-bg-color;
    @include neumorp-button-initial(mini);
    transition: box-shadow 200ms ease, transform 200ms ease;
    &:active {
      @include neumorp-button-active(mini);
      transform: translateY(1px);
    }

    &.edit.btn-submit,
    &.edit.btn-info {
      transform: scale(0);
      transition: transform 200ms ease-in-out 500ms;
    }
  }
}
</style>
