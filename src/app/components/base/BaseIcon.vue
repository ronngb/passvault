<template>
  <font-awesome-icon :icon="['fas', icon]" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  left: 2%;
  top: 50%;
  margin-top: -8px;
  color: $color-light-grey;
  font-size: 1.6rem;
}
</style>
