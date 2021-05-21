<template>
  <div class="rec-mv-item">
    <div class="img-wrap">
      <img
        v-if="recommendMvsItem.picUrl"
        :src="recommendMvsItem.picUrl"
        alt=""
      />
      <img v-else :src="recommendMvsItem.cover" alt="" />
      <span>{{ playCount(recommendMvsItem.playCount) }}</span>
    </div>
    <div class="info-wrap">
      <p class="name">{{ recommendMvsItem.name }}</p>
      <p>{{ recommendMvsItem.artistName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendMvsItem: {
      type: Object,
    },
  },
  methods:{
    /* 播放数格式化 */
    playCount(playCount) {
      return playCount > 10000 ? parseInt(playCount / 10000) + "万" : playCount;
    },
  }
};
</script>

<style>
.rec-mv-item {
  width: 250px;
  height: 150px;
  margin-bottom: 50px;
}

.rec-mv-item .img-wrap {
  position: relative;
}

.rec-mv-item .img-wrap span {
  position: absolute;
  top: 3px;
  right: 8px;
  color: #fff;
}

.rec-mv-item img {
  width: 250px;
  height: 150px;
  cursor: pointer;
  border-radius: 6px;
}
.rec-mv-item .info-wrap .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.rec-mv-item p {
  margin-top: 6px;
  margin-bottom: 6px;
}
.rec-mv-item p:last-child {
  font-size: 12px;
  color: grey;
}
</style>