<template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-10 m-12 c-12">
          <img
            :src="
              channel.data.items[0].brandingSettings.image.bannerExternalUrl
            "
            class="banner"
          />
          <div class="header">
            <div class="header-title">
              <img
                :src="channel.data.items[0].snippet.thumbnails.default.url"
                alt="img channel"
              />
              <div class="header-title__name">
                <h3>{{ channel.data.items[0].snippet.title }}</h3>
                <span
                  >{{
                    channel.data.items[0].statistics.subscriberCount
                      | formatView
                  }}
                  người đăng ký</span
                >
              </div>
            </div>
            <button
              class="header-subcriber btn"
              @click.prevent="sub()"
              :class="subcribeButton"
            >
              {{ stateSub() }}
            </button>
          </div>
          <div class="tabs-container">
            <button
              class="btn btn default tabs-content"
              :class="{ active: tabNumber == 1 }"
              @click="tabs(1)"
            >
              Trang Chủ
            </button>
            <button
              class="btn btn default tabs-content"
              :class="{ active: tabNumber == 2 }"
              @click="tabs(2)"
            >
              Video
            </button>
            <button
              class="btn btn default tabs-content"
              :class="{ active: tabNumber == 3 }"
              @click="tabs(3)"
            >
              GIỚI THiệu
            </button>
          </div>
          <div class="container">
            <!-- <feature v-if="tabNumber == 1" :channel="channel"></feature> -->
            <videos v-if="tabNumber == 2" />
            <about v-if="tabNumber == 3" :channel="channel"></about>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import About from "./About.vue";
import Feature from "./Feature.vue";
import Videos from "./Videos.vue";

export default {
  components: { About, Feature, Videos },
  async created() {
    this.createdData();
    this.checkSubcriber();
  },
  data() {
    return {
      channel: {},
      idChannel: this.$route.query.c,
      tabNumber: 1,
      items: [],
      subcribe: false,
    };
  },
  computed: {
    ...mapState("listVideo", ["channelDetails"]),
    ...mapState("user", ["listChannel"]),
    subcribeButton() {
      if (this.subcribe == false) {
        return "btn--dangerous";
      } else if (this.subcribe == true) return "btn--default";
    },
  },
  methods: {
    async createdData() {
      await this.setChannelDetails({
        part: "brandingSettings,snippet,statistics",
        id: this.idChannel,
      });
      await this.setList({
        uri: {
          part: "snippet",
          channelId: this.idChannel,
          maxResults: 50,
        },
        type: "searchList",
      });
      this.setVideoDetailsSearch({
        part: "statistics",
      });
      this.items = this.searchList;
      this.channel = this.channelDetails;
      this.checkSubcriber();
    },
    checkSubcriber() {
      let check = this.listChannel.some(
        (channel) => channel.id == this.idChannel
      );
      this.subcribe = check ? true : false;
    },
    stateSub() {
      if (this.subcribe == true) {
        return "Đã Đăng Ký";
      } else {
        return "Đăng Ký";
      }
    },
    sub() {
      if (!this.subcribe) {
        this.addChannel({
          channel: {
            id: this.idChannel,
            timeAt: new Date().getTime(),
          },
        });
      } else {
        this.deleteChannel({
          id: this.idChannel,
        });
      }
      this.subcribe = !this.subcribe;
    },
    ...mapActions("listVideo", [
      "setChannelDetails",
      "setList",
      "setVideoDetailsSearch",
    ]),
    ...mapActions("user", ["addChannel", "deleteChannel"]),
    tabs(number) {
      this.tabNumber = number;
    },
  },
  watch: {
    $route(to, from) {
      this.idChannel = to.query.c;
      this.createdData();
    },
  },
};
</script>

<style scoped>
.active {
  border-bottom: 3px solid rgba(0, 0, 0, 0.8);
}
.banner {
  width: 100%;
  height: 225px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 130px;
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-title > img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 12px;
}
.header-title__name > h3 {
  font-size: 1.8rem;
}
.header-title__name > span {
  font-size: 1.6rem;
  color: var(--text-color);
}
.header-subcriber {
  width: 120px;
}
.tabs-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  top: 55px;
  z-index: 1;
  padding: 12px 0;
  background-color: #f9f9f9;
}
.tabs-content {
  margin: 0 20px;
  width: 120px;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  background-color: #f9f9f9;
}
.tabs-content:hover {
  color: rgba(0, 0, 0, 0.8);
}
.container {
  min-height: 500px;
}
</style>