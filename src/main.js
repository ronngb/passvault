import Vue from 'vue'
import App from './app/App.vue'
import VueRouter from 'vue-router'
import FA from './fontawesome.js'
import { routes } from './app/routes/routes'
import { store } from './app/store/store'
import BaseIcon from './app/components/base/BaseIcon.vue'
import 'nprogress/nprogress.css'

Vue.component('font-awesome-icon', FA.FontAwesomeIcon)
Vue.component('font-awesome-layers', FA.FontAwesomeLayers)

Vue.component('BaseIcon', BaseIcon)

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.prototype.$EventBus = new Vue()

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
