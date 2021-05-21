<template>
  <div class="discovery">
    <carousel :bannersData="bannersData"></carousel>
    <h3>推荐歌单</h3>

    <div class="recommendPlaylists">
      <playlist-items
        :playlists="recommendPlaylist"
        @toPlaylistDetail="playlistDetail"
      ></playlist-items>
    </div>

    <h3>推荐音乐</h3>

    <div class="recommendSongs">
      <recommend-songs-items
        :recommendSongs="recommendSongs"
        @a="playStart"
      ></recommend-songs-items>
    </div>

    <h3>推荐MV</h3>

    <div class="recommendMVs">
      <recommend-mvs-items :recommendMvs="recommendMvs"></recommend-mvs-items>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getRecommendPlaylists,
  getRecommendSongs,
  getSongUrl,
  getRecommendMvs,
  
} from "network/discovery";

import Carousel from "components/carousel/Carousel";
import PlaylistItems from "components/playlists/PlaylistItems.vue";
import RecommendSongsItems from "components/songs/recommendSongs/recommendSongsItems.vue";
import RecommendMvsItems from "components/mvs/recommendMvsItems.vue";

export default {
  components: {
    Carousel,
    PlaylistItems,
    RecommendSongsItems,
    RecommendMvsItems,
  },
  data() {
    return {
      // 存放轮播图的数据
      bannersData: [],
      // 存放发现音乐--推荐歌单的数据
      recommendPlaylist: [],
      // 存放发现音乐--推荐歌曲的数据
      recommendSongs: [],
      // 存放发现音乐--推荐MV的数据
      recommendMvs: [],
      // 存放指定歌曲的URL
      SongUrl: "",
    };
  },
  methods: {
    /* 点击播放音乐 使用事件总线*/
    playStart(id) {
      getSongUrl(id).then((res) => {
        this.SongUrl = res.data.data[0].url;
        this.$bus.$emit("setSongUrl", this.SongUrl);
      });
    },
    /* 点击去歌单详情页 */
    playlistDetail(id) {
      this.$router.push({
        path: "/playlistDetail",
        query: { id: id },
      });
    },
  },
  created() {
    /* 请求轮播图的数据 */
    getBanner().then((res) => {
      this.bannersData = res.data.banners;
    });

    /* 请求发现音乐 -- 推荐歌单的数据 */
    getRecommendPlaylists(10).then((res) => {
      this.recommendPlaylist = res.data.result;
    });

    /* 请求发现音乐 -- 推荐歌曲的数据 */
    getRecommendSongs().then((res) => {
      this.recommendSongs = res.data.result;
    });

    /* 请求发现音乐 -- 推荐MV的数据 */
    getRecommendMvs().then((res) => {
      this.recommendMvs = res.data.result;
    });
  },
};
</script>

<style>
.discovery .recommendPlaylists,
.discovery .recommendSongs,
.discovery .recommendMVs {
  margin-top: 16px;
  margin-bottom: 40px;
}
</style>