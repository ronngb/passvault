import Vue from 'vue';
import App from './app/App.vue';
import VueRouter from 'vue-router';
import { routes } from './app/routes/routes';
import { store } from './app/store/store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faPencilAlt,
  faTrash,
  faEye,
  faCopy,
  faEyeSlash,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faGlobe,
  faPencilAlt,
  faTrash,
  faEye,
  faCopy,
  faEyeSlash,
  faExclamationCircle
);

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
