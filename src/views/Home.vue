<template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-10 m-12 c-12">
          <div class="home-item">
            <div class="row sm-gutter">
              <div
                class="col l-3 m-4 c-8 c-o-2"
                v-for="(item, i) in items"
                :key="i"
              >
                <item-home :item="item" :index="i" />
              </div>
              <loading-infinite
                class="loading-infinite"
                spinner="spiral"
                direction="bottom"
                @infinite="infiniteHandler"
              ></loading-infinite>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemHome from "../components/ItemHome.vue";
import NavBarBody from "../layouts/navBar/NavBarBody.vue";
import NavBarHeader from "../layouts/navBar/NavBarHeader.vue";
import { getListVideoHome } from "../mixins/getListVideoHome";
export default {
  components: {
    NavBarHeader,
    NavBarBody,
    ItemHome,
  },
  mixins: [getListVideoHome],
};
</script>
<style>
.container {
  margin-top: 56px;
  height: 100%;
  background-color: #f9f9f9;
}
.home-item {
  margin-top: 16px;
}
.loading-infinite {
  width: 100%;
}
</style>
