<template>
  <header class="header" v-click-outside="hide">
    <div class="header-left">
      <div class="header-left__nav">
        <i class="fas fa-bars" @click="showNav"></i>
        <div
          class="nav-overlay"
          @click="hideNav"
          :style="{ display: style.display }"
        ></div>
        <nav-bar-body
          :isLogin="isLogin"
          :style="{ transform: `translateX(${style.transitionX})` }"
          v-bind:styles="style"
          @styles="style"
          :viewpoint="viewpoint"
        ></nav-bar-body>
      </div>
      <div class="header__logo">
        <router-link tag="a" to="/" class="header__logo-link">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png"
            alt=""
          />
          <span class="header__logo-hover"> Trang chủ của Youtube </span>
        </router-link>
        <span class="header__logo-text">VN</span>
      </div>
    </div>
    <div class="header__center">
      <div class="header__search">
        <div action="" role="search" class="header__search-form">
          <input
            type="text"
            placeholder="Tìm kiếm"
            class="header__search-form-input"
            @keyup.enter="onSubmit()"
            v-model="input"
          />
        </div>
        <button class="header__search-form-btn btn" @click="onSubmit">
          <i class="fas fa-search"></i>
          <span class="note"> Tìm kiếm </span>
        </button>
      </div>
      <div
        class="header__search-voice"
        @click="toggle(2)"
        :class="{ activeButton: activeIndex == 2 }"
      >
        <i class="fas fa-microphone"> </i>
        <span class="note">Tìm kiếm bằng giọng nói</span>
      </div>
    </div>
    <div class="header-right">
      <button
        class="header-right__app"
        @click="toggle(3)"
        :class="{ activeButton: activeIndex == 3 }"
      >
        <i class="fas fa-th"></i>
        <span class="note">Các ứng dụng của youtube</span>
        <notice />
      </button>
      <div
        class="header-right__setting"
        @click="toggle(4)"
        :class="{ activeButton: activeIndex == 4 }"
      >
        <i class="fas fa-ellipsis-v"></i>
        <span class="note">Cài đặt</span>
      </div>
      <div v-if="isLogin" class="header-right__log-in">
        <img
          @click="isActive = !isActive"
          v-click-outside="hideLogin"
          src="https://yt3.ggpht.com/yti/ANoDKi7r7bs5Qp_ttOXbkLbbwWUY57qAjs1e4PTorZaZ=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="account-img"
        />
        <ul class="header-right__login-list" :class="{ active: isActive }">
          <li class="header-right__login-item">
            <img
              src="https://yt3.ggpht.com/yti/ANoDKi7r7bs5Qp_ttOXbkLbbwWUY57qAjs1e4PTorZaZ=s88-c-k-c0x00ffffff-no-rj-mo"
              alt="account-img"
            />
            <span>{{ auth.email }}</span>
          </li>
          <li @click="logout" class="header-right__login-item">Đăng xuất</li>
        </ul>
      </div>
      <router-link
        v-else
        tag="button"
        class="header-right__log-up btn btn-primary"
        to="/login"
      >
        <i class="fas fa-user-circle"></i>
        Đăng nhập
      </router-link>
    </div>
  </header>
</template>
<script>
import Notice from "./Notice";
import ClickOutside from "vue-click-outside";
import NavBarBody from "./NavBarBody.vue";
import { mapActions, mapState } from "vuex";
import { checkAuth } from "../../mixins/checkAuth";
export default {
  components: {
    notice: Notice,
    NavBarBody,
  },
  mixins: [checkAuth],
  data() {
    return {
      isActive: false,
      activeIndex: 0,
      input: "",
      style: {
        display: "none",
        transitionX: "0%",
      },
      viewpoint: 1,
      isLogin: false,
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  methods: {
    ...mapActions("user", ["userLogout"]),
    handleResize(event) {
      if (window.innerWidth > 1024) {
        this.viewpoint = 1; //pc
        this.style.display = "none";
        this.style.transitionX = "0%";
      } else {
        this.viewpoint = 0; // tablet&mobile
        this.style.display = "none";
        this.style.transitionX = "-100%";
      }
    },
    toggle(index) {
      this.activeIndex = index;
    },
    hide() {
      this.activeIndex = 0;
    },
    showNav() {
      if (this.viewpoint == 0) {
        this.style.display = "block";
        this.style.transitionX = "0%";
      }
    },
    hideNav() {
      this.style.display = "none";
      this.style.transitionX = "-100%";
    },
    search() {
      return this.input;
    },
    hideLogin() {
      this.isActive = false;
    },
    onSubmit() {
      if (this.input.length > 0) {
        console.log(this.input.length);
        this.$router.push({
          name: "Result",
          query: {
            search_query: this.search(),
          },
        });
      }
    },
    async logout() {
      console.log("logout");
      await this.userLogout();
      this.isLogin = false;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style>
.header-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-nav);
}
.header-left__nav > i {
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 32px;
  margin-left: 40px;
}
.header__logo {
  width: 130px;
  display: flex;
  color: var(--text-color);
}
.header__logo-link {
  position: relative;
  color: var(--text-color);
}
.header__logo-link > img {
  height: 37px;
  width: 80px;
}
.header__logo-text {
  font-weight: 300;
  margin-left: 4px;
}
</style>
<style scoped>
.header {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white-color);
  position: fixed;
  z-index: 1;
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: none;
}
.header__logo-link:hover .header__logo-hover {
  display: block;
}
.header__logo-hover {
  position: absolute;
  top: 108%;
  border: solid 1px;
  line-height: 2.4rem;
  width: 130px;
  text-align: center;
  left: 0;
  display: none;
}

/* Header - center */
.header__center {
  flex: 0 1 728px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__search {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
.header__search-form {
  flex: 1;
  display: flex;
  margin: 0;
}
.header__search-form-input {
  flex: 1;
  font-size: 1.6rem;
  line-height: 2.6rem;
  font-weight: 400;
  border: none;
}
.header__search-form-input:focus {
  outline: rgba(0, 0, 0, 0.1) auto 1px;
}
.header__search-form-input[type="text" i] {
  padding: 1px 6px;
}
.header__search-form-btn {
  width: 65px;
  padding: 1px 6px;
  height: 30px;
  position: relative;
}
.header__search-form-btn:focus {
  outline: none;
}
.header__search-form-btn:hover {
  background-color: #f0f0f0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
.header__search-form-btn:hover .note {
  display: block;
}
.header__search-form-btn:focus {
  border-color: #e9e9e9;
  outline: none;
  background-color: #e9e9e9;
}
.note {
  position: absolute;
  top: 180%;
  left: 0;
  right: 0;
  color: #f0f0f0;
  font-size: 1.4rem;
  line-height: 3rem;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;

  display: none;
}
.header__search-voice {
  min-width: 40px;
  font-size: 2.1rem;
  text-align: center;
  margin-left: 4px;
  cursor: pointer;
  position: relative;
  line-height: 32px;
}
.header__search-voice span {
  width: 160px;
  left: -69px;
}
.header__search-voice:hover .note {
  display: block;
}
/* header-right */
.header-right {
  min-width: 225px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
}
.header-right i {
  opacity: 0.6;
  cursor: pointer;
}
.header-right__app:focus .notice {
  display: block;
}
.header-right__app:focus .note {
  display: none;
}
.header-right__app,
.header-right__setting {
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  position: relative;
  font-size: 2rem;
  border: none;
  outline: none;
  background-color: var(--white-color);
}
.activeButton {
  /* click button */
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  animation: fadeIn ease-in 0.2s;
}
.header-right__app:hover span {
  display: block;
  min-width: 180px;
  left: -80%;
}

.header-right__app-list {
  display: none;
}

.header-right__app-link {
  text-decoration: none;
}

.header-right__setting:hover span {
  display: block;
  min-width: 60px;
}
.header-right__log-up {
  color: rgb(13, 110, 253);
  transition: all linear 0.4s;
  height: 40px;
  margin-right: auto;
}
.header-right__log-up:focus {
  background: rgba(0, 0, 0, 0.2);
}

.header-right__log-up i {
  opacity: 1;
  margin-right: 4px;
  font-size: 2rem;
}
.header-right__log-in img {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.header-right__log-in {
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
  background-color: var(--white-color);
}

.header-right__login-list {
  display: none;
  list-style: none;
  padding: 0;
  background-color: var(--white-color);
  position: absolute;
  z-index: 1;
  top: 75%;
  right: 5px;
  padding: 8px 16px;
  border-radius: 3px;
  width: 230px;
}
.header-right__login-list::before {
  content: "";
  width: 100%;
  height: 15px;
  position: absolute;
  top: -12%;
  right: 0;
}
.header-right__login-item {
  font-size: 1.6rem;
  padding: 8px 0;
}
.header-right__login-item > img {
  margin-right: 12px;
}
.header-right__login-item:nth-child(1) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  cursor: text;
}
.active {
  display: block;
}
</style>
