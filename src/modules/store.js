import Vue from "vue";
import vuex from "vuex";
import { listVideo } from "./listVideo";
import { user } from './user'
import createPersistedState from "vuex-persistedstate";

Vue.use(vuex);


export const store = new vuex.Store({
  modules: {
    listVideo,
    user
  },
  plugins: [createPersistedState({
    paths: ['user.listVideo', 'user.listChannel'],
  })]
});
