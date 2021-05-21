<template>
  <div class="search-content">
    <div class="title-wrap">
      <h2 class="title">{{ keywords }}</h2>
      <span class="sub-title" v-if="searchData.songCount"
        >找到{{ searchData.songCount }}个结果</span
      >
      <span class="sub-title" v-else-if="searchData.playlistCount"
        >找到{{ searchData.playlistCount }}个结果</span
      >
      <span class="sub-title" v-else>找到{{ searchData.mvCount }}个结果</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="first">
        <songs-table
          v-if="searchData.songs"
          :newsSongsData="searchData.songs"
          :tag="true"
          @a="playStart"
        ></songs-table>
        <pagination
          @getPaging="getPaging"
          :total="searchData.songCount"
          :tag="keywords"
          :pageSize="pageSize"
        ></pagination>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <playlist-items
          :playlists="searchData.playlists"
          @toPlaylistDetail="playlistDetail"
        ></playlist-items>
        <pagination
          @getPaging="getPaging"
          :total="searchData.playlistCount"
          :tag="keywords"
          :pageSize="pageSize"
        ></pagination>
      </el-tab-pane>
      <el-tab-pane label="MV" name="third">
        <recommend-mvs-items
          :recommendMvs="searchData.mvs"
        ></recommend-mvs-items>
        <pagination
          @getPaging="getPaging"
          :total="searchData.mvCount"
          :tag="keywords"
          :pageSize="pageSize"
        ></pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSearch } from "network/search";
import { getSongUrl } from "network/discovery";

import SongsTable from "components/songs/songsTable/SongsTable.vue";
import PlaylistItems from "components/playlists/PlaylistItems.vue";
import RecommendMvsItems from "components/mvs/recommendMvsItems.vue";

import pagination from "components/pagination/pagination.vue";

export default {
  components: { SongsTable, pagination, PlaylistItems, RecommendMvsItems },
  data() {
    return {
      activeName: "first",
      keywords: "",
      // 搜索结果
      searchData: {},
      // 代表不同的tabbar
      searchTabs: [1, 1000, 1004],
      searchTab: 1,
      page: 1,
      pageSize: 15,
    };
  },
  methods: {
    handleClick(tab, event) {
      this.searchTab = this.searchTabs[tab.index];
      if (this.searchTab == 1) {
        this.page = 1;
        this.pageSize = 15;
        this.request().search();
      } else if (this.searchTab == 1000) {
        this.page = 1;
        this.pageSize = 15;
        this.request().search();
      } else if (this.searchTab == 1004) {
        /* 当切换MV的页码到26页时，获取的数据突然变大 */
        this.page = 1;
        this.pageSize = 12;
        this.request().search();
      }
    },
    /* 点击播放音乐 使用事件总线*/
    playStart(id) {
      getSongUrl(id).then((res) => {
        this.SongUrl = res.data.data[0].url;
        this.$bus.$emit("setSongUrl", this.SongUrl);
      });
    },
    /* 切换页码 */
    getPaging(page) {
      this.page = page;
      this.request().search();
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
        search: () => {
          /* 请求搜索结果 */
          getSearch(
            this.keywords,
            this.searchTab,
            this.pageSize,
            (this.page - 1) * this.pageSize
          ).then((res) => {
            this.searchData = res.data.result;
          });
        },
      };
    },
  },
  created() {
    this.keywords = this.$route.query.keywords;
    this.request().search();
  },
  watch: {
    // 监听路由传过来的参数是否发生变化
    $route() {
      this.keywords = this.$route.query.keywords;
      this.request().search();
    },
  },
};
</script>

<style>
.search-content .title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.search-content .title-wrap .title {
  margin-right: 10px;
}
.search-content .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}
</style>