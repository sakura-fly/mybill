// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import vueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

import VueCookies from 'vue-cookies'
import qs from 'qs';


// Vue.use(VueCookies)

Vue.use(iView)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$cookies = VueCookies
// Vue.use(vueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
