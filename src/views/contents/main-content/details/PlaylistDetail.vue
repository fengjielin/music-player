<template>
  <div class="playlistDetail" v-if="playlistDetail">
    <div class="top-wrap" >
      <div class="img-wrap">
        <img :src="playlistDetail.coverImgUrl" alt="" height="230px" />
      </div>
      <div class="info-wrap">
        <div class="title">{{ playlistDetail.name }}</div>
        <div class="author-wrap">
          <img :src="playlistDetail.creator.avatarUrl" alt="" />
          <span class="name">{{ playlistDetail.creator.nickname }}</span>
          <span class="time"
            >{{ formatData(playlistDetail.createTime, true) }} 创建</span
          >
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlistDetail.tags" :key="index">
              {{ item }} / &nbsp;&nbsp;
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlistDetail.description }}</span>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="first">
        <songs-table
          :newsSongsData="playlistDetail.tracks"
          @a="playStart"
        ></songs-table>
      </el-tab-pane>

      <el-tab-pane name="second" class="second">
        <span slot="label"
          >评论({{ hotComments.length }})</span
        >
        <comments v-if="hotComments" :comments="hotComments"></comments>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getSongUrl,
  // 歌单详情
  getComment, 
  getPlaylistDetail,
  getHotComment,
} from "network/discovery";

import SongsTable from "components/songs/songsTable/SongsTable.vue";
import Comments from "components/comments/Comments.vue";
import pagination from "components/pagination/pagination.vue";

export default {
  components: {
    SongsTable,
    Comments,
    pagination,
  },
  data() {
    return {
      activeName: "first",
      page: 1,
      // 歌单详情
      playlistDetail: "",
      // 歌单热门评论
      hotComments: [],
      // 歌单评论
      comments: {}
    };
  },
  methods: {
    formatData(date, flag) {
      if (date) {
        let oDate = new Date(date * 1),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSec = oDate.getSeconds();

        oMonth = oMonth < 10 ? "0" + oMonth : oMonth;
        oDay = oDay < 10 ? "0" + oDay : oDay;
        oHour = oHour < 10 ? "0" + oHour : oHour;
        oMin = oMin < 10 ? "0" + oMin : oMin;
        oSec = oSec < 10 ? "0" + oSec : oSec;

        if (flag) {
          return oYear + "-" + oMonth + "-" + oDay + " " + oHour + ":" + oMin;
        } else {
          return oMin + ":" + oSec;
        }
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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
      getComment(this.$route.query.id, (this.page - 1) * 10).then((res) => {
        this.$store.commit("updatedComments", res.data);
      });
    },
  },
  created() {
    getPlaylistDetail(this.$route.query.id).then((res) => {
      this.playlistDetail = res.data.playlist;
    });
    getHotComment(this.$route.query.id).then((res) => {
      this.hotComments = res.data.hotComments;
    });
    getComment(this.$route.query.id).then((res) => {
      this.comments = res.data;
    });
  },
};
</script>

<style>
.top-wrap {
  display: flex;
}
.top-wrap .img-wrap {
  margin-right: 30px;
}

.top-wrap .title {
  margin-bottom: 20px;
}
.top-wrap .author-wrap {
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}
.top-wrap .author-wrap img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.top-wrap .author-wrap .name {
  margin-right: 10px;
}
.top-wrap .tag-wrap {
  display: flex;
}
.top-wrap .tag-wrap ul {
  display: flex;
  list-style: none;
}
</style>