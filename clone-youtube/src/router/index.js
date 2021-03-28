import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Logup from "../views/Auth/Logup.vue";
import Found404 from "../views/404Found";
import Trending from "../views/Trending.vue";
import Search from "../views/Search.vue"
import Watch from '../views/Watch.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home

    },
    {
      path: "/trending",
      name: "Trending",
      component: Trending
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        layout: "login"
      }
    },
    {
      path: "/logup",
      name: "Logup",
      component: Logup,
      meta: {
        layout: "logup"
      }
    },
    {
      path: "/result",
      name: "Result",
      component: Search
    },
    {
      path: "*",
      name: "404",
      component: Found404,
      meta: {
        layout: 404
      }
    },
    {
      path:"/watch",
      name:"watch",
      component: Watch
    }
  ],
  mode: "history"
});
