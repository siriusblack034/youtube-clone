  <template>
  <div class="container">
    <div class="grid wide">
      <div class="row">
        <div class="col l-2 m-0 c-0"></div>
        <div class="col l-9 m-12 c-12 content">
          <div class="home-filters">
            <i class="fas fa-sliders-h home-filter__icon"></i>
            <span class="home-filter__text">FILTERS</span>
            <div class="home-filter__type">
              <ul class="home-filter__list">
                <h3 class="home-filter__name">Loại</h3>
                <li class="home-filter__item">
                  <a href="" class="home-filter__link">Video</a>
                </li>
                <li class="home-filter__item">
                  <a href="" class="home-filter__link">Channel</a>
                </li>
              </ul>
              <ul class="home-filter__list">
                <h3 class="home-filter__name">Thời lượng</h3>
                <li class="home-filter__item">
                  <a href="" class="home-filter__link">Dài(Trên 20 phút)</a>
                </li>
                <li class="home-filter__item">
                  <a href="" class="home-filter__link"
                    >Trung bình({{ filterTime }})</a
                  >
                </li>
                <li class="home-filter__item">
                  <a href="" class="home-filter__link">Ngắn(Dưới 4 phút)</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="home-item" v-for="(item, index) in items" :key="index">
            <item-trending v-if="isVideo(item)" :item="item"></item-trending>
            <item-channel v-if="isChannel(item)" :item="item"></item-channel>
          </div>
          <!-- <loading-infinite
            class="loading-infinite"
            spinner="spiral"
            direction="bottom"
            @infinite="infiniteHandler"
          ></loading-infinite> -->
        </div>
        <div class="col l-1 m-0 c-0"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemTrending from "../components/ItemTrending";
import ItemChannel from "../components/ItemChannel";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    ItemTrending,
    ItemChannel,
  },
  async created() {
    this.searchQuery();
    await this.setCreated();
  },
  data() {
    return {
      items: [],
      filterTime: ">4 phút & < 20 phút",
      selectFilter: false,
      query: "",
    };
  },
  methods: {
    async setCreated() {
      await this.setList({
        uri: {
          part: "snippet",
          q: this.query,
          maxResults: 8,
        },
        type: "searchList",
      });
      await this.setVideoDetailsSearch({
        part: "statistics",
      });
      this.items = this.searchList;
    },
    searchQuery() {
      let query = this.$route.query.search_query.split(" ").join("+");
      this.query = query;
    },
    ...mapActions("listVideo", ["setList", "setVideoDetailsSearch"]),
    isChannel(item) {
      let kind = item.id.kind.split("#")[1];
      return kind == "channel";
    },
    isVideo(item) {
      let kind = item.id.kind.split("#")[1];
      return kind == "video";
    },
  },
  computed: {
    ...mapState("listVideo", ["searchList"]),
  },
  watch: {
    $route(to, from) {
      this.query = to.query.search_query.split(" ").join("+");
      this.setCreated();
    },
    items: {
      handler(val, oldVal) {
        this.items = val;
      },
      deep: true,
    },
  },
};
</script>

<style>
.container {
  margin-top: 56px;
  height: 100%;
  background-color: #f9f9f9;
}
.home-item {
  margin-top: 16px;
}
.content {
  background-color: #f9f9f9;
  min-height: 100vh;
}
.home-filters {
  display: flex;
  align-items: center;

  font-size: 1.7rem;
  padding: 16px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
.home-filters:hover .home-filter__icon,
.home-filter__text {
  opacity: 0.7;
}
.home-filter__text {
  padding-left: 8px;
  cursor: pointer;
}
.home-filter__icon {
  cursor: pointer;
}

.home-filter__type {
  display: flex;
}
.home-filter__list {
  list-style: none;
  display: none;
}
.home-filter__name {
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.home-filter__item {
  font-size: 1.6rem;
  line-height: 3rem;
}
.home-filter__link {
  text-decoration: none;
  color: var(--text-color);
}
</style>