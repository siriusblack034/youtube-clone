<template>
  <div
    class="nav-body"
    :style="{ transform: `translateX(${styles.transitionX})` }"
  >
    <div class="header-left">
      <div class="header-left__nav">
        <i class="fas fa-bars" @click="hideNav"></i>
      </div>
      <div class="header__logo">
        <router-link class="header__logo-link" tag="a" to="/">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png"
            alt="logo-ytb"
          />
        </router-link>
        <span class="header__logo-text">VN</span>
      </div>
    </div>
    <div class="scrollbar" id="style-2">
      <div class="force-overflow">
        <ul class="body-top__list">
          <router-link
            tag="li"
            class="body-top__item"
            to="/"
            :class="$route.name == 'Home' ? 'bg-red' : ''"
          >
            <i
              class="fas fa-home"
              :style="{ color: $route.name == 'Home' ? '#fa2b2b' : '' }"
            ></i>
            Trang chủ
          </router-link>

          <router-link
            tag="li"
            class="body-top__item"
            :class="$route.name == 'Trending' ? 'bg-red' : ''"
            to="/trending"
          >
            <i
              class="fas fa-fire"
              :style="{ color: $route.name == 'Trending' ? '#fa2b2b' : '' }"
            ></i>
            Thịnh Hành
          </router-link>

          <router-link
            v-if="isLogin"
            tag="li"
            class="body-top__item"
            to="/ChannelRegister"
          >
            <i class="fas fa-step-forward"></i>
            Kênh đăng ký
          </router-link>
        </ul>
        <ul class="body-top__list">
          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-photo-video"></i>
            Thư viện
          </router-link>

          <router-link
            v-if="isLogin"
            class="body-top__item"
            tag="li"
            :class="
              $route.name == 'Playlist' && $route.query.list == 'W'
                ? 'bg-red'
                : ''
            "
            :to="{
              path: '/playlist',
              query: {
                list: 'W',
              },
            }"
          >
            <i
              class="fas fa-history"
              :style="{
                color:
                  $route.name == 'Playlist' && $route.query.list == 'W'
                    ? '#fa2b2b'
                    : '',
              }"
            ></i>
            Video đã xem
          </router-link>

          <router-link
            v-if="isLogin"
            class="body-top__item"
            tag="li"
            :class="
              $route.name == 'Playlist' && $route.query.list == 'LL'
                ? 'bg-red'
                : ''
            "
            :to="{
              path: '/playlist',
              query: {
                list: 'LL',
              },
            }"
          >
            <i
              class="fas fa-thumbs-up"
              :style="{
                color:
                  $route.name == 'Playlist' && $route.query.list == 'LL'
                    ? '#fa2b2b'
                    : '',
              }"
            ></i>
            Video yêu thích
          </router-link>

          <router-link
            v-if="isLogin"
            class="body-top__item"
            tag="li"
            :class="
              $route.name == 'Playlist' && $route.query.list == 'WL'
                ? 'bg-red'
                : ''
            "
            :to="{
              path: '/playlist',
              query: {
                list: 'WL',
              },
            }"
          >
            <i
              class="fas fa-clock"
              :style="{
                color:
                  $route.name == 'Playlist' && $route.query.list == 'WL'
                    ? '#fa2b2b'
                    : '',
              }"
            ></i>
            Xem sau
          </router-link>
        </ul>
        <ul v-if="isLogin" class="body-top__list">
          <h3 class="body-top__list-tiltle">Kênh đăng ký</h3>

          <router-link
            class="body-top__item"
            tag="li"
            v-for="channel in channels"
            :key="channel.data.items[0].id"
            :to="{
              path: 'channel',
              query: {
                c: channel.data.items[0].id,
              },
            }"
          >
            <img
              :src="channel.data.items[0].snippet.thumbnails.medium.url"
              alt="imgChannel"
            />
            {{ channel.data.items[0].snippet.title }}
          </router-link>
          <!-- <button class="btn" v-if="channels.length > 6">
            {{ status }}
          </button> -->
        </ul>
        <div class="body-top__list" v-if="isLogin == false">
          <notice-login />
        </div>
        <ul class="body-top__list">
          <h3>Dịch vụ khác của YOUTUBE</h3>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-gamepad"></i>
            Game
          </router-link>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-history"></i>
            Trực tiếp
          </router-link>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-trophy"></i>
            Thể thao
          </router-link>
        </ul>

        <ul class="body-top__list">
          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-cog"></i>
            Cài đặt
          </router-link>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-flag"></i>
            Lịch sử báo cáo
          </router-link>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-question-circle"></i>
            Trợ giúp
          </router-link>

          <router-link class="body-top__item" tag="li" to="/404Found">
            <i class="fas fa-exclamation-triangle"></i>
            Gửi phản hồi
          </router-link>
        </ul>
        <ul class="body-top__list">
          <li class="body-top__item" style="opacity: 0.6">
            © Clone by Sirius Black
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NoticeLogin from "../../components/NoticeLogin.vue";
export default {
  components: { NoticeLogin },
  props: ["styles", "viewpoint", "isLogin"],
  async created() {
    await this.callChannel();
  },
  computed: {
    ...mapState("listVideo", ["channelDetails"]),
    ...mapState("user", ["listChannel"]),
    status() {
      return this.statusSubcriber ? "Hiện thị tất cả" : "Ẩn bớt";
    },
  },
  data() {
    return {
      countChannel: 6,
      channels: [],
      statusSubcriber: true,
    };
  },
  methods: {
    ...mapActions("listVideo", ["setChannelDetails"]),
    async callChannel() {
      let id = this.listChannel[0].id;
      console.log(this.listChannel[0].id);
      await this.setChannelDetails({
        part: "snippet",
        id,
      });
      console.log(this.channelDetails);
      this.channels.push(this.channelDetails);
    },

    hideNav() {
      if (this.viewpoint == 0) {
        this.styles.display = "none";
        this.styles.transitionX = "-100%";
        this.setup;
      }
    },
    setup() {
      this.$emit("styles", this.styles);
    },
  },
  watch: {
    channels: () => {},
  },
};
</script>

<style scoped>
.nav-body {
  font-size: 1.4rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: white;
}

.header-left {
  border-bottom: 1px solid #e5e5e5;
}
.header-left__nav > i {
  margin-right: 20px;
}
.header__logo {
  margin-right: 20px;
}
.header__logo-text {
  font-size: 0.4rem;
}
.scrollbar {
  width: 224px;
  height: 100vh;
  background: #ffff;
  overflow-y: scroll;
  margin-bottom: 25px;
}
.force-overflow {
  min-height: 450px;
}
.body-top__list {
  list-style: none;

  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 0;
}
.body-top__item {
  font-size: 1.6rem;
  line-height: 2rem;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 40px;
}
.body-top__item:hover {
  background-color: rgba(0, 0, 0, 0.2);
  color: black;
}
.body-top__item {
  color: var(--text-color);
  text-decoration: none;
  opacity: 0.9;
  display: flex;
  align-items: center;
}
.body-top__item > i {
  margin-right: 12px;
  font-size: 1.8rem;
}
.body-top__list-tiltle {
  padding-top: 8px;
  padding-bottom: 8px;
}
.body-top__item--active i {
  color: #db3c32;
}
.body-top__item--active {
  background-color: #e5e5e5;
}
.body-top__item > img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
}
li {
  cursor: pointer;
}
.body-top__list > h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #787878;
  text-transform: uppercase;
  padding-left: 40px;
}
.bg-red {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
