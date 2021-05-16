<template>
  <div class="notice">
    <ul class="notice__list">
      <li class="notice__item">
        <a href="" class="notice__link">
          <i class="fab fa-youtube"></i>
          <span>Youtube TV</span>
        </a>
      </li>
      <li class="notice__item">
        <a href="" class="notice__link"
          ><i class="fab fa-youtube"></i> <span>Youtube Music</span></a
        >
      </li>
      <li class="notice__item">
        <a href="" class="notice__link">
          <i class="fab fa-youtube"></i>
          <span>Youtube Kids</span></a
        >
      </li>
      <li class="notice__item">
        <a href="" class="notice__link"
          ><i class="fab fa-youtube"></i> <span>Học viện sáng tạo</span></a
        >
      </li>
      <li class="notice__item">
        <a href="" class="notice__link"
          ><i class="fab fa-youtube"></i> <span>Dành cho nghệ sĩ</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notice {
  background-color: white;
  z-index: 10;
}
.notice__list {
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.notice__item {
  height: 32px;
  padding: 0 36px 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 3rem;
  margin: 16px 0;
  position: relative;
}
.notice__item:nth-child(1)::after,
.notice__item:nth-child(3)::after {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}

.notice__item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.notice__link {
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
}
.notice__link i {
  color: #ff0000;
  font-size: 2.4rem;
}
.notice__link span {
  flex: 1;
  margin-left: 16px;
}
</style>
