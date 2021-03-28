<template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-10 m-12 c-12 content">
          <div class="home-item" v-for="(item, index) in items" :key="index">
            <item-trending :item="item"></item-trending>
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
</template>
<script>
import { mapState } from "vuex";
import ItemTrending from "../components/ItemTrending.vue";
import NavBarHeader from "../layouts/navBar/NavBarHeader.vue";
export default {
  components: { ItemTrending, NavBarHeader },
  data() {
    return {
      items: [],
      page: 0,
    };
  },
  async created() {
    /* await this.setList({
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
    });
    this.setVideoDetails({
      part: "statistics",
    }); */
    this.page = 0;
    this.items = this.getListVideoLoading();
    console.log(this.page);
  },
  methods: {
    /* ...mapActions("listVideo", ["setList"]),
    ...mapActions("listVideo", ["setVideoDetails"]), */
    infiniteHandler($state) {
      setTimeout(() => {
        if (this.items.length <= this.listVideo.length - 8) {
          this.page++;
          this.items.push(...this.getListVideoLoading());
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 1500);
    },
    getListVideoLoading() {
      let arrList = [];
      let min = 8 * this.page;
      let max = 8 * this.page + 8;
      for (let i = min; i < max; i++) {
        arrList.push(this.listVideo[i]);
      }
      return arrList;
    },
  },
  computed: {
    ...mapState("listVideo", ["listVideo"]),
  },
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
.content {
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>
