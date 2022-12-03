<template>
  <div v-bind:style="{ color: invalid ? '#dd2626' : '#90a4ae' }">
    <label :for="label" ref="inputLabel">{{ label }}</label>
    <input
      v-validate
      :type="inputType"
      @input="updateValue"
      @focus="setFocus"
      @blur="setFocus"
      v-bind="$attrs"
      :class="{
        'is-invalid': invalid,
        'is-valid': valid,
        'read-only': !icon,
      }" />
    <font-awesome-icon v-if="icon" :icon="['fas', icon]" class="icons" />
    <!-- ERROR: @click="inputType" -->
    <font-awesome-layers
      v-if="type == 'password'"
      @click="inputSwitch"
      class="eye-slash-icon">
      <font-awesome-icon :icon="['fas', 'eye']" />
      <font-awesome-icon
        :class="{ 'slash-icon': true, active: inputType != 'password' }"
        :icon="['fas', 'slash']" />
    </font-awesome-layers>
    <p :class="{ 'is-error': true, active: invalid }">
      <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
      {{ `The ${label.toLowerCase()} field is empty` }}
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    invalid: {
      type: Number,
      default: 0,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      inputType: this.type,
    }
  },
  directives: {
    validate: {
      bind(el, binding, vnode) {
        if (el.value) {
          vnode.context.$refs.inputLabel.classList.toggle('active')
        }
      },
    },
  },
  methods: {
    inputSwitch() {
      if (this.inputType == 'password') {
        return (this.inputType = 'text')
      }
      this.inputType = 'password'
    },
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
    setFocus(event) {
      if (!event.target.value) {
        this.$refs.inputLabel.classList.toggle('active')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
  width: fit-content;
  display: inline-block;
}

label {
  display: block;
  position: absolute;
  top: -20px;
  z-index: 2;
  color: inherit;
  transform: translate(38px, 33px);
  font-size: 17px;
  transition: font-size 350ms ease-in-out, transform 350ms ease-in-out;
  width: fit-content;
  pointer-events: none;
}

label.active {
  font-size: 14px;
  transform: translate(0);
  transition: font-size 350ms ease-in-out, transform 350ms ease-in-out;
}

input {
  min-width: 300px;
  position: relative;
  height: 48px;
  border-radius: 16px;
  box-shadow: inset -3px -3px 3px rgba(255, 255, 255, 0.5),
    inset 4px 4px 4px rgba(163, 177, 198, 0.6);
}

.is-invalid {
  border: 1px solid $danger-color;
  transition: border 200ms ease-in-out;
}

.is-valid {
  border: 1px solid $success-color;
  transition: border 200ms ease-in-out;
}

.icons {
  position: absolute;
  top: 50%;
  left: 5%;
  margin-top: -9px;
  color: inherit;
}

.eye-slash-icon {
  font-size: 1rem;
  position: absolute;
  top: 50%;
  right: 10%;
  margin-top: -9px;
}

.slash-icon {
  color: $secondary-color;
  transform: scale(0);
}

.slash-icon.active {
  transform-origin: top left;
  transform: scale(1);
  transition: transform 300ms ease-in-out;
}

.check-icon {
  position: absolute;
  top: 50%;
  right: 5%;
  margin-top: -9px;
  color: $success-color;
}

.is-error {
  position: absolute;
  color: $danger-color;
  left: 2%;
  margin: 0;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 300;
  padding: 5px 0;
  transform: translateX(20px);
  opacity: 0;
  transition: transform 150ms ease-in, opacity 150ms ease-in;
}
.is-error.active {
  opacity: 1;
  transform: translateX(0);
  transition: transform 150ms ease-in, opacity 150ms ease-in;
}

.read-only {
  text-indent: 0;
  box-shadow: none;
}
</style>
