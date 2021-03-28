<template>
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
      <img :src="item.snippet.thumbnails.medium.url" alt="img-video" />
      <span>4:40</span>
    </div>
    <div class="col c-6 m-8 l-9 item__content">
      <h3 class="item__content-title max-line">{{ item.snippet.title }}</h3>
      <div class="item__content-middle">
        <span class="item__content-name-channel">{{
          item.snippet.channelTitle
        }}</span>
        <span class="item__content-view"
          >{{ item.snippet.view | formatView }} lượt xem</span
        >
      </div>
      <div class="item__content-des max-line">
        {{ item.snippet.description }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    formatId() {
      if (this.$route.name == "Trending") {
        return this.item.id;
      } else {
        return this.item.id.videoId;
      }
    },
  },
};
</script>

<style scoped>
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
