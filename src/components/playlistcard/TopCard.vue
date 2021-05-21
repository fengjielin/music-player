<template>
  <div class="top-card">
    <div class="img-wrap">
      <img :src="hightQualityPlaylist.coverImgUrl" alt="" />
    </div>
    <div class="info-wrap">
      <div class="tag" @click="playlistDetail(hightQualityPlaylist.id)">
        精品歌单
      </div>
      <div class="title">{{ hightQualityPlaylist.name }}</div>
      <div class="info">{{ hightQualityPlaylist.description }}</div>
    </div>
    <img class="bg" :src="hightQualityPlaylist.coverImgUrl" alt="" />
    <div class="bg-mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    hightQualityPlaylist: {
      type: Object,
    },
  },
  methods: {
    playlistDetail() {
      this.$emit("toPlaylistDetail");
    },
  },
};
</script>

<style>
.top-card {
  display: flex;
  height: 200px;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.top-card .img-wrap,
.top-card .info-wrap {
  z-index: 1;
}
.top-card .img-wrap img {
  height: 160px;
  width: 160px;
  margin-right: 20px;
}
.top-card .info-wrap .tag {
  width: 100px;
  height: 30px;
  border: 1px solid #dfac67;
  color: #dfac67;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.top-card .info-wrap .title {
  color: #fff;
  padding-top: 10px;
}
.top-card .info-wrap .info {
  padding-top: 5px;
  font-size: 14px;
  color: #888482;
}
.top-card .bg-mask,
.top-card .bg {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.top-card .bg {
  z-index: 0;
  filter: blur(20px);
}
.top-card .bg-mask {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>