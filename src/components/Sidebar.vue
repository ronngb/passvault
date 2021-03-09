<template>
  <div class="col-md-3 px-0 border">
    <nav id="sidebarMenu" class=" navbar-collapse">
      <!-- 1st child -->
      <div class="sidebar-header d-flex align-items-center">
        <span class="pl-2">Sort by:</span>
        <span class="">
          <select class="custom-select custom-select-sm border-0 bg-light">
            <option>Name (A-Z)</option>
            <option>Name (A-Z)</option>
          </select>
        </span>
        <span class="ml-auto mr-2">2 logins</span>
      </div>
      <!-- List acct. -->
      <div class="d-flex flex-column">
        <!-- TODO: only border bottom is present -->
        <ol class="list-group bg-light">
          <li class="list-group-item d-flex justify-content-start py-2">
            <div class="d-flex align-items-center mr-3">
              <font-awesome-icon icon="globe" />
            </div>
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>

          <li class="list-group-item d-flex justify-content-start">
            <div class="d-flex align-items-center mr-3">
              <font-awesome-icon icon="globe" />
            </div>
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
        </ol>

      </div>
      <div class="bg-light border border-right-0 p-3">
        <button type="button" class="btn btn-secondary btn-block btn-sm">
          Create New Account
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>


<style scoped>
#sidebarMenu {
  height: calc(100vh - 65px);
}

.sidebar-header {
  border-bottom: 1px solid #dee2e6;
}

.sidebar-header > span {
  font-size: 0.8rem;
  color: #6c757d;
}

.list-group-item {
  border: 0px;
  border-bottom: 1px solid #dee2e6;
}
</style>