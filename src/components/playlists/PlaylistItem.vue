<template>
  <div class="playlist-item">
    <div class="img-wrap">
      <div class="desc-wrap">
        <span v-if="playlistItem.copywriter">{{
          playlistItem.copywriter
        }}</span>
        <span v-else>播放量：{{ playCountFormat(playlistItem.playCount) }}</span>
      </div>
      <img v-if="playlistItem.picUrl" :src="playlistItem.picUrl" alt="" />
      <img v-else :src="playlistItem.coverImgUrl" alt="" />
    </div>
    <p class="name" v-if="playlistItem.name">{{ playlistItem.name }}</p>
    <p class="name" v-else>{{ playlistItem.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    playlistItem: {
      type: Object,
    },
  },
  methods:{
    playCountFormat(playCount){
     return playCount / 10000 >= 1? parseInt(this.playlistItem.playCount / 10000)+'万' : this.playlistItem.playCount;
    }
  }
};
</script>

<style>
.playlist-item {
  width: 200px;
  margin: 10px;
  position: relative;
  font-size: 14px;
  overflow: hidden;
}
.playlist-item img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
}
.playlist-item .img-wrap {
  position: relative;
}
.playlist-item .desc-wrap {
  position: absolute;
  left: 0;
  top: -50px;
  font-size: 14px;
  color: #fff;
  text-align: left;
  width: 100%;
  padding: 5px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.playlist-item:hover .desc-wrap {
  top: 0;
}

.playlist-item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示。 */
  -webkit-box-orient: vertical; /* 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp: 1; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。 */
}
</style>