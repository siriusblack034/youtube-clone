<template>
  <div class="container" v-if="check && isLogin">
    <div class="gird">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-10 m-12 c-12">
          <div class="row">
            <div class="col l-10 m-10 c-12">
              <h3 class="history-title">
                {{ title }}
              </h3>
              <div
                class="history-list"
                v-for="(time, index) in times"
                :key="index"
              >
                <span
                  class="history-time"
                  v-if="type == 'videoLiked' || type == 'watched'"
                  >{{ time }}</span
                >
                <ul
                  class="history-list-video"
                  v-for="(video, index) in filterVideo(time)"
                  :key="index"
                >
                  <item-trending
                    :item="video.video"
                    :checkVideo="type == 'watchLate' ? false : true"
                    class="item"
                  >
                  </item-trending>
                  <div
                    class="history-list-video__cancel"
                    @click="deleteVideo(video.video.id)"
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </ul>
              </div>
            </div>
            <div class="col l-2 m-2 c-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemTrending from "../components/ItemTrending.vue";
import { checkAuth } from "../mixins/checkAuth";
export default {
  mixins: [checkAuth],
  components: { ItemTrending },
  async created() {
    await this.createdMethod();
  },
  data() {
    return {
      type: "",
      list: [],
      times: [],
      check: false,
      title: "",
    };
  },
  computed: {
    ...mapState("user", ["listVideo"]),
    ...mapState("listVideo", "video"),
    getList() {
      return this.list;
    },
  },
  methods: {
    ...mapActions("listVideo", ["setVideo", "addInformVideo"]),
    ...mapActions("user", ["deleteVideoFb"]),
    filterVideo(time) {
      return this.getList.filter((video) => video.time == time);
    },
    async createdMethod() {
      let type = this.$route.query.list;
      if (type == "LL") {
        this.type = "videoLiked";
        this.title = "Video Đã Thích";
      } else if (type == "WL") {
        this.type = "watchLate";
        this.title = "Video Xem Sau";
      } else if (type == "W") {
        this.type = "watched";
        this.title = "Video Đã Xem";
      }
      await this.formatTime();
      this.check = true;
    },
    async formatTime() {
      this.list = await Promise.all(
        this.listVideo[`${this.type}`].map(async (video) => {
          let date = new Date(video.timeAt);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let time = `${day}/${month}/${year}`;
          await this.setVideo({
            part: "statistics,contentDetails,snippet",
            id: video.id,
          });
          let videoId = this.$store.state.listVideo.video.data.items[0];
          let v = {
            time,
            video: videoId,
          };
          return v;
        })
      );
      console.log(this.list);
      this.times = new Set(
        this.list.map((video) => {
          return video.time;
        })
      );
      console.log(this.times);
    },
    deleteVideo(id) {
      this.deleteVideoFb({
        id: id,
        type: this.type,
      });
      let index = this.list.findIndex((video) => video.video.id == id);
      this.list.splice(index, 1);
      console.log(this.list);
    },
  },
  watch: {
    $route(to, from) {
      this.check = false;
      this.createdMethod();
    },
    
  },
};
</script>

<style scoped>
.container {
  margin-top: 56px;
  height: 100%;
  background-color: #f9f9f9;
}
.history-title {
  font-size: 2rem;
}
time {
  font-size: 1.7rem;
}
.history-list-video {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  margin: 0;
}
.history-time {
  font-size: 1.6rem;
  font-weight: 500;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-top: 16px;
}
.history-list-video i {
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.history-list-video i:hover {
  color: rgba(0, 0, 0, 0.8);
}
</style>