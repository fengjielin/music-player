<template>
  <div class="new-songs">
    <tab-bar @setTag="setTag" :tagList="tagList" :tag="tag"></tab-bar>
    <songs-table :tag="true" :newsSongsData="newsSongsData" @a="playStart"></songs-table>
  </div>
</template>

<script>
import { getNewsSongs } from "network/news.js";
import { getSongUrl } from "network/discovery";

import SongsTable from "components/songs/songsTable/SongsTable.vue";
import TabBar from "components/tabbar/TabBar.vue";
export default {
  components: { SongsTable, TabBar },
  data() {
    return {
      // tabbar标签
      tagList: ["全部", "华语", "欧美", "日本", "韩国"],
      // 当前的tabbar选中
      tag: "全部",
      // 当tabbar改变时，用来请求数据的类型
      types: [0, 7, 96, 8, 16],
      type: 0,

      // 存放最新音乐的数据
      newsSongsData: [],
    };
  },
  methods: {
    /* 切换tabbar的标签 */
    setTag(item) {
      this.tag = item;
      let index = this.tagList.indexOf(item);
      this.type = this.types[index];
      this.request().NewsSongs();
    },
    /* 点击播放音乐 使用事件总线*/
    playStart(id) {
      getSongUrl(id).then((res) => {
        this.SongUrl = res.data.data[0].url;
        this.$bus.$emit("setSongUrl", this.SongUrl);
      });
    },

    request() {
      return {
        /* 封装网络请求 注意this的指向 */
        NewsSongs: () => {
          /* 请求最新音乐的歌曲数据 */
          getNewsSongs(this.type).then((res) => {
            this.newsSongsData = res.data.data;
          });
        },
      };
    },
  },
  created() {
    this.request().NewsSongs();
  },
};
</script>

<style>
</style>