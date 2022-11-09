<template>
  <font-awesome-layers class="eye-slash-layers" @click="changeType">
    <font-awesome-icon class="eye-icon" :icon="['fas', 'eye']" />
    <font-awesome-icon :class="classObj" :icon="['fas', 'slash']" />
  </font-awesome-layers>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    classObj() {
      return {
        'slash-icon': true,
        active: this.isActive,
      }
    },
  },
  methods: {
    changeType() {
      this.$emit('change-type')
      this.isActive = !this.isActive
    },
  },
}
</script>

<style lang="scss" scoped>
.eye-slash-layers {
  font-size: 1.7rem;
  position: absolute;
  top: 50%;
  right: 10%;
  margin-top: -9px;
  color: $color-light-grey;
}

.slash-icon {
  transform: scale(0);
  transition: transform 300ms ease-in-out;
}

.slash-icon.active {
  transform-origin: top left;
  transform: scale(1);
  transition: transform 300ms ease-in-out;
}
</style>
