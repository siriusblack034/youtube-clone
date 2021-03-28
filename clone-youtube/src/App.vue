<template>
  <div id="app">
    <div class="header">
      <div class="grid">
        <div class="row">
          <nav-bar-header v-if="layout"> </nav-bar-header>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavBarHeader from "../src/layouts/navBar/NavBarHeader";
export default {
  name: "App",
  components: {
    NavBarHeader,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout == 404) {
        return false;
      } else if (this.$route.meta.layout == "login") return false;
      else if (this.$route.meta.layout == "logup") return false;
      else return true;
    },
  },
};
</script>

<style>
</style>
