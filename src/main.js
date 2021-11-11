import Vue from 'vue';
import App from './app/App.vue';

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

Vue.prototype.$EventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
