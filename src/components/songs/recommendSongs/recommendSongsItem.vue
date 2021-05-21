<template>
  <div class="rec-song-item">
    <div class="img-wrap" @click="playClick(recommendSongsItem.id)">
      <img :src="recommendSongsItem.picUrl" alt="" />
    </div>
    <div class="song-wrap">
      <p>{{recommendSongsItem.name}}</p>
      <p>{{recommendSongsItem.song.artists[0].name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendSongsItem: {
      type: Object,
    },
  },
  methods: {
    playClick(id){
      this.$emit("a", id);
    } 
  },
};
</script>

<style>
.rec-song-item {
  width: 50%;
  height: 100px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.rec-song-item img {
  width: 80px;
  height: 80px;
}

.rec-song-item .img-wrap {
  cursor: pointer;
}

.rec-song-item .song-wrap {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
}

.rec-song-item .song-wrap p:last-child {
  font-size: 12px;
  color: grey;
}

.rec-song-item:hover {
  background-color: #f5f5f5;
}
</style>