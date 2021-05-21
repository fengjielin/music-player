<template>
  <div class="player">
    <audio controls autoplay src=""></audio>
  </div>
</template>

<script>
export default {

  mounted() {
    document.getElementsByTagName('audio')[0].volume = 0.4
    this.$bus.$on('setSongUrl',function(url){
      document.getElementsByTagName('audio')[0].src = url;
    }) 
  },
}
</script>

<style>
.player>audio {
  width: 100%;
}
</style>