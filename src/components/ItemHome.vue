<template>
  <div class="home-item">
    <router-link
      class="item"
      :to="{
        name: 'watch',
        query: {
          v: item.id.videoId ? item.id.videoId : item.id,
        },
      }"
    >
      <div class="item-top">
        <img
          :src="video.snippet.thumbnails.high.url"
          alt="imgvideo"
          class="item__img"
        />
        <span class="item-top__duration">{{
          video.contentDetails.duration | durationVideo
        }}</span>
      </div>
      <div class="item__title">
        <img
          v-if="!isChannel"
          class="item__title-img-channel"
          src="https://yt3.ggpht.com/ytc/AAUvwnjYU4gHW9Mol_WLE2tu70Oj9Og0SlY-ZOy5mdngCw=s68-c-k-c0x00ffffff-no-rj"
          alt="img-channel"
        />
        <div class="item__title-des">
          <h4 class="item__title-name">
            {{ video.snippet.title }}
          </h4>
          <span v-if="!isChannel" class="item__name-channel">{{
            video.snippet.channelTitle
          }}</span>
          <div class="item__footer">
            <span class="item__footer-view"
              >{{ video.snippet.view | formatView }}

              Lượt xem</span
            >
            <span class="item__footer-time-up">{{
              video.snippet.publishedAt | formatDate
            }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
    isChannel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      video: {},
    };
  },
  mounted() {
    this.video = this.item;
  },
};
</script>

<style scoped>
.home-item {
  padding-bottom: 20px;
}
.item {
  text-decoration: none;
  color: var(--text-color);
}
.item-top {
  position: relative;
}
.item-top__duration {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 10px;
  right: 16px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.8rem;
}
.item__img {
  width: 100%;
  position: relative;
}

.item__title {
  margin: 8px 0;
  display: flex;
  align-items: center;
}
.item__title-img-channel {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.item__title-des {
  padding-left: 16px;
}
.item__title-name {
  margin: 4px 0;
  line-height: 1.8rem;
  font-size: 1.4rem;
  color: var(--text-color);
  height: 3.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.item__name-channel {
  font-size: 1.4rem;
  line-height: 1.6rem;
  padding: 8px 0;
}
.item__footer {
  margin: 8px 0;
  font-size: 1.4rem;
}
.item__footer-time-up {
  padding-left: 8px;
}
@media (min-width: 640px) and (max-width: 1240px) {
  .item__footer-time-up {
    display: block;
    padding: 8px 0;
  }
}
</style>
