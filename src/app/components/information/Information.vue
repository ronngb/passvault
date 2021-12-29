<template>
  <div id="acct-main" class="">
    <!-- REMIND: This maybe place for router-view -->
    <router-view :ref-modal="$refs.modalDialog" />
    <!-- TODO: Save the testModal to $store -->
    <ModalDialog ref="modalDialog" />
  </div>
</template>
<script>
import ModalDialog from '../modal/ModalDialog.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Information',
  data() {
    return {
      acctInfo: {},
      focusId: 1,
    }
  },
  components: {
    ModalDialog,
  },
}
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}

@media (max-width: 768px) {
  #acct-main {
    padding: 1.5rem 1.5rem;
  }
}
</style>
