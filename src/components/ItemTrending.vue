<template>
  <div class="container">
    <router-link
      class="item row"
      :to="{
        name: 'watch',
        query: {
          v: formatId(),
        },
      }"
    >
      <div class="col c-6 m-4 l-3 item__img">
        <img :src="video.snippet.thumbnails.medium.url" alt="img-video" />
        <span>4:40</span>
      </div>
      <div class="col c-6 m-8 l-9 item__content">
        <h3 class="item__content-title max-line">{{ video.snippet.title }}</h3>
        <div class="item__content-middle">
          <span class="item__content-name-channel">{{
            video.snippet.channelTitle
          }}</span>
          <span class="item__content-view"
            >{{ viewCount() | formatView }} lượt xem</span
          >
        </div>
        <div class="item__content-des max-line">
          {{ video.snippet.description }}
        </div>
      </div>
    </router-link>
    <button class="item__content-add" v-if="!id">
      <i class="fas fa-ellipsis-v"></i>
      <ul class="item__content-add-list">
        <li class="item__content-add-item">
          <i class="fas fa-clock"></i>
          <span>Lưu vào danh sách xem sau</span>
        </li>
      </ul>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: Object,
    id: {
      type: String,
      default: null,
    },
  },
  async created() {
    if (this.id) {
      await this.setVideo({
        part: "statistics,contentDetails,snippet",
        id: this.id,
      });
      this.video = this.$store.state.listVideo.video.data.items[0];
    } else {
      this.video = this.item;
    }
  },
  data() {
    return {
      styleObject: {
        display: "none",
      },
      video: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions("listVideo", ["setVideo", "addInformVideo"]),
    formatId() {
      if (this.id == null) {
        if (this.$route.name == "Trending") {
          return this.item.id;
        } else {
          return this.item.id.videoId;
        }
      }
      return this.id;
    },
    viewCount() {
      if (this.id) {
        return this.video.statistics.viewCount;
      }
      return this.video.snippet.view;
    },
  },
};
</script>
<style>
.item__content-add {
  position: absolute;
  top: 0;
  right: 10%;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  width: 40px;
  height: 40px;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 3px;
}
.item__content-add:hover > i {
  color: black;
}

.item__content-add-list {
  display: none;
  position: absolute;
  right: -50px;
  list-style: none;
  background: var(--white-color);
  padding: 0;
  width: 300px;
  border-radius: 3px;
}
.item__content-add-item {
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
}
.item__content-add:focus .item__content-add-list {
  animation: fadeIn linear 0.3s;
  display: block;
}
.item__content-add-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
<style scoped>
.container {
  position: relative;
}
.item {
  padding: 8px 12px;
  text-decoration: none;
  color: var(--text-color);
}
.item__img {
  position: relative;
}
.max-line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.item__img > span {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 10px;
  right: 28px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.8rem;
}
.item__img > img {
  width: 100%;
  height: 100%;
}
.item__content {
  max-width: 640px;
  min-width: 0px;
  position: relative;
}
.item__content-title {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.4rem;
  margin: 0;
}
.item__content-middle {
  font-size: 1.4rem;
  line-height: 2rem;
  color: rgba(0, 0, 0, 0.7);
}

.item__content-view {
  margin-left: 12px;
}
.item__content-des {
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 12px;
}

@media (max-width: 739px) {
  .item__content-view {
    display: block;
    margin-left: 0;
  }
}
</style>
