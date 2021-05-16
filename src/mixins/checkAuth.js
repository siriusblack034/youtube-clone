import { mapActions, mapState } from "vuex";
import { store } from "../modules/store";

export const checkAuth = {
  data() {
    return {
      isLogin: false
    }
  },
  created() {
    this.initAuth();
    this.isLogin = this.auth.token != null ? true : false
  },
  methods: {
    ...mapActions('user', ['initAuth'])
  },
  computed: {
    ...mapState('user', ['auth'])
  }
}