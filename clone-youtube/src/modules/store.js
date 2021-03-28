import Vue from "vue";
import vuex from "vuex";
import { listVideo } from "./listVideo";
Vue.use(vuex);
export const store = new vuex.Store({
  modules: {
    listVideo
  }
});
