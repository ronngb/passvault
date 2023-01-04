<template>
  <div class="error-page-container">
    <h1 class="error-page-heading">404</h1>
    <p class="error-page-paragraph">
      Oops!, maybe what your looking for is outside our universe try to go back
    </p>
    <HomeButton
      @click="$router.replace({ name: 'home' })"
      class="btn-contained">
      HOME
    </HomeButton>
  </div>
</template>

<script>
import NeumorpButton from '../neumorp/NeumorpButton.vue'
export default {
  components: {
    HomeButton: NeumorpButton,
  },
  created() {
    this.$emit('ready')
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: $primary-bg-color;
  }
  &-heading {
    font-size: 30rem;
    text-align: center;
    font-family: $nunito-sans;
    font-weight: 400;
    letter-spacing: 5px;
    color: $primary-bg-color;
    text-shadow: -9px -9px 15px rgba($top-shadow-color, 0.7),
      5px 10px 10px rgba(0, 0, 0, 0.2);
  }

  &-paragraph {
    font-size: 3rem;
    text-align: center;
    color: $primary-color;
    width: 50%;
    margin-top: 0;
  }
}
</style>
