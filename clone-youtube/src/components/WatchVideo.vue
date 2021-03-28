<template>
  <div class="player">
    <div
      class="player-video__video"
      v-html="video.data.items[0].player.embedHtml"
    ></div>
    <div class="player__inform">
      <h3 class="player__inform-title">
        {{ video.data.items[0].snippet.title }}
      </h3>
      <div class="player__inform-des">
        <span class="player__inform-des-view">
          {{ video.data.items[0].statistics.viewCount | formatNumber }} lượt xem
        </span>

        <div class="player__inform-des-react">
          <div
            @click="activeReact(0)"
            class="player__inform-des-item"
            :class="{
              'player__inform-des-item--active': react[0],
            }"
          >
            <i class="fas fa-thumbs-up"></i>
            <span>
              {{
                video.data.items[0].statistics.likeCount | formatNumber
              }}</span
            >
            <span class="explain-react">Thích</span>
          </div>
          <div
            @click="activeReact(1)"
            class="player__inform-des-item"
            :class="{
              'player__inform-des-item--active': react[1],
            }"
          >
            <i class="fas fa-thumbs-down"></i>
            <span>
              {{
                video.data.items[0].statistics.dislikeCount | formatNumber
              }}</span
            >
            <span class="explain-react">Không Thích</span>
          </div>
          <div class="player__inform-des-item">
            <i class="fas fa-share"></i>
            <span class="explain-react">Chia Sẻ</span>
          </div>
          <div class="player__inform-des-item">
            <i class="fas fa-stream"></i>
            <span class="explain-react">Lưu</span>
          </div>
        </div>
      </div>
    </div>
    <div class="player-bottom">
      <div class="player-channel">
        <div class="channel">
          <img
            :src="informVideo.srcImgChannel"
            alt=""
            class="player-channel__img"
          />
          <h5 class="player-channel__name">
            {{ this.video.data.items[0].snippet.channelTitle }}
          </h5>
        </div>
        <button
          class="btn player-channel__subcriber"
          :class="subcribeButton"
          @click.prevent="sub()"
        >
          {{ stateSub() }}
        </button>
      </div>
      <div class="player-des">
        <span :style="{ '-webkit-line-clamp': contentDes ? 2 : 0 }">{{
          this.video.data.items[0].snippet.description
        }}</span>
        <button @click="contentDes = !contentDes" class="btn btn-default">
          {{ content() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object,
  },
  data() {
    return {
      react: [false, false],
      subcribe: false,
      contentDes: true,
      informVideo: {
        srcImgChannel:
          "https://yt3.ggpht.com/ytc/AAUvwnhsyJc9p6MwF2AGPnieeLJFHVe3IHP04vxvDHYgGQ=s48-c-k-c0x00ffffff-no-rj",
      },
    };
  },
  computed: {
    subcribeButton() {
      if (this.subcribe == false) {
        return "btn--dangerous";
      } else if (this.subcribe == true) return "btn--default";
    },
    reactClass() {
      console.log("activeReact");
      if (this.isActive == true) {
        return "player__inform-des-item--active";
      }
    },
  },
  methods: {
    stateSub() {
      if (this.subcribe == true) {
        return "Đã Đăng Ký";
      } else {
        return "Đăng Ký";
      }
    },
    sub() {
      if (this.subcribe) {
        this.subcribe = false;
      } else {
        this.subcribe = true;
      }
    },
    activeReact(index) {
      console.log(this.react);
      if (index == 0) {
        this.react[0] = this.react[0] == true ? false : true;
        this.react[1] = false;
      } else {
        this.react[1] = this.react[1] == true ? false : true;
        this.react[0] = false;
      }

      console.log(this.react);
    },
    content() {
      if (this.contentDes) {
        return "Hiện chi tiết";
      }
      return "Ẩn đi";
    },
  },
  watch: {
    contentDes: () => {},
  },
};
</script>

<style>
.player {
  padding-top: 12px;
}
.player-video__video iframe {
  width: 100%;
  height: 400px;
}
.player__inform {
  line-height: 2rem;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.player__inform-title {
  font-size: 1.8rem;
  padding: 12px 0;
  margin: 0;
}
.player__inform-des {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.player__inform-des-view {
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.7);
  padding-right: 8px;
}
.player__inform-des-react {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 1.7rem;
  align-items: center;
}
.player__inform-des-item {
  margin: 0 12px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  cursor: pointer;
  position: relative;
}
.player__inform-des-item:hover .explain-react {
  display: block;
}
.explain-react {
  display: none;
  position: absolute;
  bottom: -42px;
  right: 0;
  left: 0;
  min-width: 120px;
  line-height: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  color: var(--white-color);
  padding: 4px;
  text-align: center;
  animation: fadeIn ease-in 0.2s;
}
.player__inform-des-item--active {
  color: var(--success-color);
}
.player-bottom {
  padding: 12px 8px 8px 12px;
}
.player-channel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.channel {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.player-channel__img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 12px;
}
.player-channel__name {
  margin: 0;
  font-size: 1.4rem;
}
.player-channel__subcriber {
  border-radius: 2px;
  margin-right: 4px;
}
.player-des {
  padding: 30px 0 0 50px;
}
.player-des > span {
  line-height: 2.4rem;
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.player-des > button {
  background-color: var(--white-color);
  color: var(--text-color);
  font-weight: 600;
  opacity: 0.7;
}
</style>