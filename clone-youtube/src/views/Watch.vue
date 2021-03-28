  <template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-7 m-7 c-12">
          <watch-video :video="videoStore" />
        </div>
        <div class="col l-3 m-4 c-0">
          <div class="list-video" v-for="(item, i) in items" :key="i">
            <item-home :item="item" :index="i" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import WatchVideo from "../components/WatchVideo.vue";
export default {
  data() {
    return {
      idVideo: this.$route.query.v,
      videoStore: {},
    };
  },
  components: {
    WatchVideo,
  },
  async created() {
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
  },
  methods: {
    ...mapActions("listVideo", ["setVideo", "addInformVideo"]),
  },
  computed: {
    ...mapGetters("listVideo", ["getVideo"]),
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