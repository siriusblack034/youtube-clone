<template>
  <div class="row about">
    <div class="col l-8 m-8 c-8">
      <div class="about-description">
        <h3>Mô Tả</h3>
        <span>{{ channel.data.items[0].snippet.description }}</span>
      </div>
      <div class="about-description">
        <h3>Chi Tiết</h3>
        <span>Địa điểm: Vương quốc Anh</span>
      </div>
    </div>
    <div class="col l-4 m-4 c-4 about-statistical">
      <h3>Thống Kê</h3>
      <span>Đã tham gia : 2012-02-11 </span>
      <span
        >{{ channel.data.items[0].statistics.viewCount | formatNumber }} lượt
        xem</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channel: Object,
  },
};
</script>

<style scoped>
.about {
  margin-top: 20px;
  
}

h3 {
  font-size: 1.8rem;
}
span {
  line-height: 1.8rem;
  word-spacing: 0.2rem;
  font-size: 1.5rem;
  padding: 0 8px;
}
.about-statistical {
  display: flex;
  flex-direction: column;
}
</style>