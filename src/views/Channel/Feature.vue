<template>
  <div>
    <VueSlickCarousel v-bind="settings">
      <item-home
        class="item-home"
        v-for="(item, index) in listVideo"
        :key="index"
        :item="item"
        :index="index"
        :isChannel="true"
      />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapState } from "vuex";
import ItemHome from "../../components/ItemHome.vue";

export default {
  name: "MyComponent",
  components: { VueSlickCarousel, ItemHome },
  created() {
    this.listVideo = this.searchList;
  },
  
  data() {
    return {
      listVideo: [],
      settings: {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        useCSS: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("listVideo", ["searchList"]),
  },
};
</script>
<style  >
.slick-prev:before,
.slick-next::before {
  color: black;
  font-size: 5rem;
}
.slick-prev {
  left: -60px;
}
</style>
<style scoped>
.item-home {
  padding: 12px 8px;
}
</style>