import Vue from 'vue';
import App from './app/App.vue';
import VueRouter from 'vue-router';
import FontAwesomeIcon from './fontawesome.js';
import { routes } from './app/routes/routes';
import { store } from './app/store/store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.prototype.$EventBus = new Vue();

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
