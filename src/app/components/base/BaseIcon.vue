<template>
  <font-awesome-icon :icon="['fas', icon]" :class="classes" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    classes: {
      type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
svg {
  color: $color-light-grey;
  font-size: 1.7rem;
}

.icon-lg {
  font-size: 4.48rem !important;
}

.icon-md {
  font-size: 3.2rem !important;
}

%position-absolute {
  position: absolute;
  top: 50%;
  margin-top: -9px;
}

.search-icon {
  @extend %position-absolute;
  left: 2%;
}

.input-type-icon {
  @extend %position-absolute;
  left: 5%;
  color: inherit !important;
}
</style>
