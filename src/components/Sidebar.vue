<template>
  <div class="col-md-3 px-0 border">
    <nav id="sidebarMenu" class="collapse navbar-collapse">
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
      <div id="acct__list-item" class="d-flex flex-column ">
        <!-- TODO: only border bottom is present -->
        <ol id="acct-lists" class="list-group bg-light">

          <li class="acct-item d-flex justify-content-start ">

            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted">ronny.gabi@gmail.com</span>
            </div>
          </li>

          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>

          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>
          <li class="acct-item d-flex justify-content-start">
            <font-awesome-icon icon="globe" class="align-self-center mr-3" />
            <div class="d-flex flex-column">
              <span>lazada.com.ph</span>
              <span class="text-muted ">ronny.gabi@gmail.com</span>
            </div>
          </li>

        </ol>

      </div>
      <div class="new-acct border-right-0 p-3">
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
@media (max-width: 768px) {
  #sidebarMenu {
    height: calc(100vh - 135px);
  }
}

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
#acct__list-item ol {
  max-height: 450px;
  overflow: auto;
}

#acct-lists > li {
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
}

.new-acct {
  position: relative;
  border: 1px solid #dee2e6;
  top: 6%;
}

.list-group-item {
  border: 0px;
  border-bottom: 1px solid #dee2e6;
}
</style>