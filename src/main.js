// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ScrollShadow from "vue-scroll-shadow";
import LoadingInfinite from "vue-infinite-loading";
import { store } from "./modules/store";
import { required, email, max, min, size } from "vee-validate/dist/rules";
import moment from 'moment'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
Vue.filter('formatNumber', (value) => {
  return new Intl.NumberFormat({ style: 'currency' }).format(value)
})
Vue.filter('formatDate', (value) => {
  let time = value.split('T')[0].split('-').join('');
  return !time ? '' : moment(time, "YYYYMMDD").fromNow();
})
Vue.filter('durationVideo', (value) => {
  let duration = value.split('PT')[1]
  let s = duration.split('M')[1].split('S')[0]
  let m = duration.split('M')[0].split('H')[1]



})
Vue.filter('formatView', (val) => {
  let value = Number(val)
  if (value < 1000) {
    return value
  }
  else if (value < 1000000)
    return parseInt((value % 1000) / 100) != 0 ? `${parseInt(value / 1000)},${parseInt((value % 1000) / 100)}N` : `${parseInt(value / 1000)}N`
  else if (value < 1000000000)
    return parseInt((value % 1000000) / 100000) != 0 ? `${parseInt(value / 1000000)},${parseInt((value % 1000000) / 100000)}Tr` : `${parseInt(value / 1000000)}tr`
  else {
    return parseInt((value % 1000000000) / 100000000) != 0 ? `${parseInt(value / 1000000000)},${parseInt((value % 1000000000) / 100000000)}T` : `${parseInt(value / 1000000000)}T`
  }
})
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} don't empty!"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password does not match"
});

extend("size", {
  ...size,
  message: "video size should be less than 5 MB!"
});
Vue.use(router);
Vue.use(VueCookies)
Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("LoadingInfinite", LoadingInfinite);
Vue.component("scroll-shadow", ScrollShadow);

import "./assets/css/base.css";
import "./assets/css/grid.css";
import "./assets/icons/fontawesome-free-5.15.2-web/css/all.css";
import "./assets/css/style.css";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
