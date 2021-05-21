<template>
  <div class="rec-song-items">
    <recommend-songs-item
      v-for="(item, index) in recommendSongs"
      :key="index"
      :recommendSongsItem="item"
      v-on="$listeners" 
    ></recommend-songs-item>
  </div>
</template>

<script>
import recommendSongsItem from "components/songs/recommendSongs/recommendSongsItem";
export default {
  components: { recommendSongsItem },
  props:{
    recommendSongs:{
      type: Array
    }
  }
};
</script>

<style>
.rec-song-items {
  display: flex;
  flex-wrap: wrap;
}
</style>