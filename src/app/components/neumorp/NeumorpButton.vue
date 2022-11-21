<template>
  <button v-click="() => $listeners.click.fns()" class="btn">
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
  }
  &-danger {
    color: $danger;
    &:focus {
      outline: none;
      text-shadow: $danger 1px 0px 15px;
    }
  }

  &-contained {
    width: 9.5rem;
    height: 3.7rem;
    border-radius: 10px;
    margin: 0 10px;
    font-weight: bold;
    box-shadow: neumorp-button-initial($contained);

    &:hover {
      opacity: 0.5;
      transition: opacity 200ms ease-out;
    }
    &:active {
      opacity: 1;
      box-shadow: neumorp-button-press($contained);
    }
  }

  &-float {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
    bottom: 30px;
    left: 20vw;
    position: fixed;
    box-shadow: neumorp-button-initial($float);
    &:hover {
      opacity: 0.5;
      transition: opacity 200ms ease-out;
    }
    &:active {
      opacity: 1;
      box-shadow: neumorp-button-press($float);
    }
  }
}
</style>
