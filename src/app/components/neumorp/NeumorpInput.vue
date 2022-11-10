<template>
  <div v-bind:class="[{ invalid: invalid }]">
    <input @input="updateValue" v-bind="$attrs" ref="inputRef" required />
    <label :for="label.toLowerCase()">{{ label }}</label>
    <slot></slot>
    <ShowPasswordIcon
      v-if="label.toLowerCase() == 'password'"
      @change-type="inputTypeBool = !inputTypeBool" />
    <p :class="{ 'has-error': invalid }">
      <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
      {{ `The ${label.toLowerCase()} field is empty` }}
    </p>
  </div>
</template>

<script>
import ShowPasswordIcon from '../icon/ShowPasswordIcon.vue'

export default {
  components: { ShowPasswordIcon },
  inheritAttrs: false,
  data() {
    return {
      inputTypeBool: true,
    }
  },
  props: {
    invalid: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
  },
  watch: {
    inputTypeBool(value) {
      this.$refs.inputRef.type = value ? 'password' : 'text'
    },
  },
  computed: {
    classObject() {
      return {
        'has-error': this.invalid,
      }
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
  width: fit-content;
  display: inline-block;
  color: $secondary-color;

  &.invalid {
    color: $danger;

    & input {
      border: 1px solid $danger;
      transition: border 200ms ease-in-out;
    }

    & svg,
    & label {
      color: inherit;
    }
  }
}

label {
  display: block;
  position: absolute;
  top: -20px;
  z-index: 2;
  transform: translate(38px, 33px);
  font-size: 1.7rem;
  transition: font-size 350ms ease-in-out, transform 350ms ease-in-out;
  width: fit-content;
  pointer-events: none;
}

input {
  min-width: 300px;
  position: relative;
  height: 48px;
  color: $tertiary-color;
  font-weight: 700;
  caret-color: $tertiary-color;
  border-radius: 16px;
  box-shadow: inset -3px -3px 3px rgba(255, 255, 255, 0.5),
    inset 4px 4px 4px rgba(163, 177, 198, 0.6);

  &:focus ~ label,
  &:not(:focus):valid ~ label {
    font-size: 1.4rem;
    transform: translate(0);
    transition: font-size 350ms ease-in-out, transform 350ms ease-in-out;
  }
}

p {
  position: absolute;
  color: $danger;
  left: 2%;
  margin: 0;
  font-family: $nunito-sans;
  font-size: 1.3rem;
  font-weight: 300;
  padding: 5px 0;
  transform: translateX(20px);
  opacity: 0;
  transition: transform 150ms ease-in, opacity 150ms ease-in;

  &.has-error {
    opacity: 1;
    transform: translateX(0);
    transition: transform 150ms ease-in, opacity 150ms ease-in;
  }
}
</style>
