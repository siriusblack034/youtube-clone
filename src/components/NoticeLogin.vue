<template>
  <div class="notice-login">
    <h3 class="notice-login__title">
      Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
    </h3>
    <router-link class="notice-login__button btn" tag="button" to="/login">
      Đăng nhập
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notice-login__title {
  margin: 0;
  font-size: 1.4rem;
  color: #787878;
  text-transform: uppercase;
  padding-left: 40px;
}
.notice-login__button {
  border: 1px solid var(--success-color);
  background-color: var(--white-color);
  color: var(--success-color);
  margin: 12px 32px;
}
.notice-login__button:hover {
  animation: fadeIn linear 0.2s;
  background-color: var(--success-color);
  color: var(--white-color);
}
</style>