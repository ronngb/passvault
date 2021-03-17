<template>
  <main id="acct-main" class="col-md-7 ">
    <AccountInfo />
    <!-- <AccountNew /> -->
  </main>
</template>
<!-- eslint-disable -->
<script>
import AccountInfo from "./AccountInfo.vue";
import AccountNew from "./AccountNew.vue";

export default {
  name: "AccountMain",
  components: {
    AccountInfo,
    AccountNew,
  },
};
</script>

<style>
#acct-main {
  padding: 3rem 3rem;
}
</style>
