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
    <!-- TODO: to remove 25/11 -->
    <!-- <button
          @click="animatePressed(account.id, $event)"
          type="submit"
          class="btn-lg btn-save">
          Save
        </button> -->
    <!-- <button
          @click="animatePressed($event)"
          type="button"
          class="btn-lg btn-cancel">
          Cancel
        </button> -->
  </div>
</template>

<script>
import NeumorpButton from '../components/neumorp/NeumorpButton.vue'

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
