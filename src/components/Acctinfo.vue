<template>
  <main id="acct-info" class="col-md-7 ">
    <div class="acct-info__header d-flex align-items-center">

      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="" />
        lazada.com.ph
      </h4>
      <!-- This <hr> will appear in mobile -->
      <hr class="d-block d-lg-none">

      <button type="button" class="btn  mx-1">
        <span class="text-muted">
          <font-awesome-icon icon="pencil-alt" class="mr-1" /> Edit
        </span>
      </button>
      <button type="button" class="btn mx-1">
        <span class="text-muted ">
          <font-awesome-icon icon="trash" class="mr-1" />Remove
        </span>
      </button>

    </div>
    <!-- Header End -->
    <hr class="d-none d-lg-block"><!-- Line Seperator -->
  </main>

</template>

<script>
export default {
  name: "Acctinfo",
};
</script>

<style>
#acct-info {
  padding: 3rem 3rem;
}

.acct-info__header > button {
  border: none;
  border-radius: 2px;
  color: #343a40;
  background-color: #f8f9fa;
}
</style>
