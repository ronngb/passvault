<template>
  <font-awesome-icon
    :icon="['fas', icon]"
    :class="[indefault ? 'default-style' : '']" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    indefault: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
svg {
  color: $color-light-grey;
  font-size: 1.6rem;
}

.default-style {
  position: absolute;
  left: 2%;
  top: 50%;
  margin-top: -8px;
}
</style>
