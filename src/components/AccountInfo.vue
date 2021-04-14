<template>
  <!-- Need to change the attr. ID, Class, name conflict(acct-info) -->
  <div id="acct-info">
    <div class="acct-info__header d-lg-flex align-items-center">
      <!-- this line will new component will be place -->
      <h4 class="mr-auto mb-0">
        <font-awesome-icon icon="globe" class="mr-2" />
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
    <!-- Website address Start -->
    <div class="mb-3">
      <label class="col-form-label">website address</label>
      <div>
        <a href="https://www.linkedin.com" style="font-size: 15px">https://www.linkedin.com</a>
      </div>
    </div>
    <!-- TODO: Prob. in column  -->
    <!-- Website address End -->
    <form class="acct-info__form">
      <!-- Username Start -->
      <div class="mb-3">
        <label class="label">Username</label>
        <div class="form-row">
          <div class="col-8 col-md-5">
            <input type="text" readonly class="form-control-plaintext" id="username" value="ronny.gabi@gmail.com">
          </div>
          <div class="col-4 col-md-5 align-self-center">
            <button type="button" class="btn btn-light px-lg-5 ">
              <span class="text-muted ">Copy</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Password Start -->
      <div class="mb-3">
        <label class="label">Password</label>
        <div class="form-row align-items-center">
          <div class="col-6 col-md-3">
            <input type="Password" readonly class="form-control-plaintext" id="password" value="rod">
          </div>
          <div class="col-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox">
            </div>
          </div>
          <div class="col-4">
            <button type="button" class="btn btn-light px-lg-5">
              <span class="text-muted ">Copy</span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <hr class="mx-0" style="width:40px">
    <div class="acct-info__date">
      <p>Created: September 3, 2020</p>
      <p>Last modified: September 22, 2020</p>
      <p>Last used: September 3, 2020</p>
    </div>
  </div>
</template>

<script>


export default {
  name: "Acctinfo",
  methods: {

  }
};
</script>

<style>
/* #acct-info {
  padding: 3rem 3rem;
} */

@media (max-width: 768px) {
  #acct-info {
    padding: 1.5rem 1.5rem;
  }
}

.acct-info__header > button {
  border: none;
  border-radius: 2px;
  color: #343a40;
  background-color: #f8f9fa;
}

.acct-info__date > p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}
</style>
