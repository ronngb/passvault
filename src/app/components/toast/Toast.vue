<template>
  <div class="toast">
    <transition-group name="toast-transition" appear>
      <ToastItem v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </transition-group>
  </div>
</template>

<script>
import ToastItem from './ToastItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ToastItem,
  },
  computed: mapState({ toasts: (state) => state.toast.toasts }),
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1.6rem;
}
</style>
