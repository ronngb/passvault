<template>
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70px;
  transform: translate(-50%, -50%);
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: $tertiary-color;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
</style>
