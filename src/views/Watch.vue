  <template>
  <div class="container" v-if="check">
    <div class="grid">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-7 m-7 c-12">
          <watch-video :video="videoStore" />
        </div>
        <div class="col l-3 m-4 c-0">
          <item-home
            v-for="(item, i) in items"
            :key="i"
            :item="item"
            :index="i"
          />
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
import { mapActions, mapMutations } from "vuex";
import WatchVideo from "../components/WatchVideo.vue";
import { checkAuth } from "../mixins/checkAuth";
import { getListVideoHome } from "../mixins/getListVideoHome";
import ItemHome from "../components/ItemHome";
export default {
  mixins: [checkAuth, getListVideoHome],
  data() {
    return {
      idVideo: this.$route.query.v,
      videoStore: {},
      init: false,
      check: false,
    };
  },
  components: {
    WatchVideo,
    ItemHome,
  },
  async created() {
    await this.callApi();
  },
  methods: {
    ...mapActions("listVideo", ["setVideo", "setList", "addInformVideo"]),
    ...mapActions("user", ["addVideo"]),
    async callApi() {
      await this.setVideo({
        part: "player",
        id: this.idVideo,
      });
      await this.addInformVideo({
        part: "statistics",
        id: this.idVideo,
      });
      await this.addInformVideo({
        part: "snippet",
        id: this.idVideo,
      });
      this.videoStore = this.$store.state.listVideo.video;
      if (this.isLogin) {
        this.addVideo({
          type: "watched",
          video: {
            id: this.videoStore.data.items[0].id,
            timeAt: new Date().getTime(),
          },
        });
      }
      this.check = true;
    },
  },
  watch: {
    $route(to, from) {
      this.check = false;
      this.idVideo = to.query.v;
      this.callApi();
    },
  },
};
</script>

<style>
.container {
  margin-top: 56px;
  height: 100%;
  background-color: #f9f9f9;
}
</style>