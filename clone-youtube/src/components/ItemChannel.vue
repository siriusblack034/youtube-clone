<template>
  <router-link
    class="item row"
    :to="{
      name: 'channel',
      query: {
        c: item.id.channelId,
      },
    }"
  >
    <div class="col c-6 m-4 l-3 item__img">
      <img :src="item.snippet.thumbnails.medium.url" alt="img-video" />
    </div>
    <div class="col c-6 m-8 l-9 item__right">
      <div class="item__content">
        <h3 class="item__content-title max-line">{{ item.snippet.title }}</h3>
        <div class="item__content-des max-line">
          {{ item.snippet.description }}
        </div>
      </div>
      <div class="item__right-subButton">
        <button class="btn" :class="subcribeButton" @click.prevent="sub()">
          {{ stateSub() }}
        </button>
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
    return {
      subcribe: false,
    };
  },
  methods: {},
  computed: {
    subcribeButton() {
      if (this.subcribe == false) {
        return "btn--dangerous";
      } else if (this.subcribe == true) return "btn--default";
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
      console.log(this.subcribe);
      if (this.subcribe) {
        this.subcribe = false;
      } else {
        this.subcribe = true;
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
  height: 143px;

  width: 143px;
  display: flex;
  align-content: center;
  justify-content: center;
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
  height: 100%;
  border-radius: 50%;
}
.item__content {
  max-width: 640px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex: 1;
}
.item__content-title {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.4rem;
  margin: 0;
}
.item__right {
  display: flex;
}
.item__content-des {
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 12px;
}
.item__right-subButton {
  width: 140px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.item__right-subButton > button {
  border-radius: 3px;
  min-width: 100px;
}
@media (max-width: 739px) {
  .item__content-view {
    display: block;
    margin-left: 0;
  }
}
</style>
