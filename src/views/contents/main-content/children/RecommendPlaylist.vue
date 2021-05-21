<template>
  <div class="recommend-playlist">
    <top-card :hightQualityPlaylist="hightQualityPlaylist" @toPlaylistDetail="playlistDetail"></top-card>
    <div class="tab-container">
      <tab-bar @setTag="setTag" :tagList="tagList" :tag="tag"></tab-bar>
      <div class="tab-content">
        <playlist-items
          :playlists="playlistData"
          @toPlaylistDetail="playlistDetail"
        ></playlist-items>
      </div>
      <pagination :total="total" :tag="tag" @getPaging="getPaging" :pageSize = 10></pagination>
    </div>
  </div>
</template>

<script>
import { getPlaylist, getHightQualityPlaylist } from "network/rec_playlist.js";

import TabBar from "components/tabbar/TabBar.vue";
import PlaylistItems from "components/playlists/PlaylistItems.vue";
import Pagination from "components/pagination/pagination.vue";
import TopCard from "components/playlistcard/TopCard.vue";

export default {
  components: { TabBar, PlaylistItems, Pagination, TopCard },
  data() {
    return {
      tagList: ["全部","欧美","华语","流行","说唱","摇滚","民谣","电子","轻音乐","影视原声","ACG","怀旧","治愈","旅行"],
      // 当前的tabbar选中
      tag: "全部",
      // 存放歌单数据
      playlistData: [],
      // 存放当前页码
      page: 1,
      // 歌单数据总条数
      total: 0,
      // 存放给topcard的数据
      hightQualityPlaylist: {},
    };
  },
  methods: {
    /* 切换tabbar的标签 */
    setTag(item) {
      this.tag = item;
      this.request().playlist();
      this.request().hightQualityPlaylist();
    },
    /* 切换页码 */
    getPaging(page) {
      this.page = page;
      this.request().playlist();
    },
    /* 点击去歌单详情页 */
    playlistDetail(id) {
      this.$router.push({
        path: "/playlistDetail",
        query: { id: id },
      });
    },

    request() {
      return {
        /* 封装网络请求 注意this的指向 */
        playlist: () => {
          /* 请求歌单数据 */
          getPlaylist(this.tag, (this.page - 1) * 10).then((res) => {
            this.playlistData = res.data.playlists;
            this.total = res.data.total;
          });
        },
        hightQualityPlaylist: () => {
          /* 请求精品歌单数据--topcard */
          getHightQualityPlaylist(this.tag).then((res) => {
            this.hightQualityPlaylist = res.data.playlists[0];
          });
        },
      };
    },
  },
  created() {
    this.request().playlist();
    this.request().hightQualityPlaylist();
  },
};
</script>

<style>
.recommend-playlist {
  margin-top: 16px;
  margin-bottom: 40px;
}

.tab-container {
  padding-top: 30px;
}

.tab-bar {
  margin-bottom: 16px;
}
</style>