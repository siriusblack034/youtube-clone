import { mapState, mapActions } from "vuex";
export const getListVideoHome = {
  async created() {
    await this.setList({
      uri: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 50,
      },
      type: "homeList",
    });
    await this.setVideoDetails({
      part: "statistics",
    });
    this.list = this.listVideo
    this.items = this.getListVideoHome();
  },
  data() {
    return {
      items: [],
      list: []
    };
  },
  methods: {
    ...mapActions("listVideo", ["setList", "setVideoDetails"]),
    infiniteHandler($state) {
      setTimeout(() => {
        if (this.items.length <= this.list.length - 8) {
          this.items.push(...this.getListVideoHome());
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 1500);
    },
    getListVideoHome() {
      let arrList = [];
      for (let i = 0; i < 8; i++) {
        arrList.push(
          this.list[Math.floor(Math.random() * this.list.length)]
        );
      }
      return arrList;
    },
  },
  computed: {
    ...mapState("listVideo", ["listVideo"]),
  },
}