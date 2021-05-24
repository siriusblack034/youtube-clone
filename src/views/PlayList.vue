<template>
  <div class="container">
    <div class="gird">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-10 m-12 c-12">
          <div class="row">
            <div class="col l-9 m-9 c-12">
              <h3 v-if="type == 'watched'" class="history-title">
                Lịch sử xem
              </h3>
              <div
                class="history-list"
                v-for="(time, index) in times"
                :key="index"
              >
                <span v-if="type == 'watched'" class="history-time">{{
                  time
                }}</span>
                <ul
                  class="history-list-video"
                  v-for="(video, index) in filterVideo(time)"
                  :key="index"
                >
                  <item-trending :id="video.id" class="item"> </item-trending>
                  <div
                    class="history-list-video__cancel"
                    @click="deleteVideo(video.id)"
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </ul>
              </div>
            </div>
            <div class="col l-3 m-3 c-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemTrending from "../components/ItemTrending.vue";
export default {
  components: { ItemTrending },
  async created() {
    await this.createdMethod();
  },
  data() {
    return {
      type: "",
      list: [],
      times: [],
    };
  },
  computed: {
    ...mapState("user", ["listVideo"]),
    ...mapState("listVideo", "video"),
  },
  methods: {
    ...mapActions("listVideo", ["setVideo"]),
    ...mapActions("user", ["deleteVideoFb"]),
    filterVideo(time) {
      console.log(time);
      return this.list.filter((video) => video.date == time);
    },
    createdMethod() {
      let type = this.$route.query.list;
      if (type == "LL") this.type = "videoLiked";
      else if (type == "WL") this.type = "watchLate";
      else if (type == "W") this.type = "watched";
      this.formatTime();
    },
    formatTime() {
      this.list = this.listVideo[`${this.type}`].map((video) => {
        let date = new Date(video.timeAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let time = `${day}/${month}/${year}`;
        let v = {
          date: time,
          id: video.id,
        };
        return v;
      });
      this.times = new Set(
        this.list.map((video) => {
          return video.date;
        })
      );
    },
    deleteVideo(id) {
      this.deleteVideoFb({
        id: id,
        type: "watched",
      });
    },
  },
  watch: {
    async $route(to, from) {
      let type = to.query.list;
      console.log(11111111111111111);
      if (type == "LL") this.type = "videoLiked";
      else if (type == "WL") this.type = "watchLate";
      else if (type == "W") this.type = "watched";
      await this.formatTime();
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