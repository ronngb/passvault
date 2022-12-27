<template>
  <div class="button-group">
    <NeumorpButton
      type="submit"
      class="btn-submit btn-contained"
      @click="$emit('submit')">
      Save
    </NeumorpButton>
    <NeumorpButton
      type="button"
      class="btn-danger btn-contained"
      @click="$emit('cancel')">
      Cancel
    </NeumorpButton>
  </div>
</template>

<script>
import NeumorpButton from '../neumorp/NeumorpButton.vue'

export default {
  components: { NeumorpButton },
}
</script>

<style lang="scss" scoped>
.button-group {
  height: 80px;

  & button {
    margin: 20px 10px;
  }
}
</style>
