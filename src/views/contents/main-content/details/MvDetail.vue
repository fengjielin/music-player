<template>
  <div class="mvdetails">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <div class="video-wrap">
        <video id="video" controls :src="mvurl"></video>
      </div>
      <div class="info-wrap">
        <div class="singer-info">
          <div class="cover-wrap">
            <img :src="artists.picUrl" alt="" />
          </div>
          <span class="name">{{ artists.name }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvDetail.name }}</h2>
          <span class="date">发布:{{ mvDetail.publishTime }}</span>
          <span class="number">播放:{{ mvDetail.playCount }}次</span>
          <p class="desc"></p>
        </div>
      </div>
      <div class="comments-wrap">
        <div class="title">热门评论 ({{ mvHotComment.length }})</div>
        <div class="item" v-for="(item, index) in mvHotComment" :key="index">
          <div class="icon-wrap">
            <img :src="item.user.avatarUrl" alt="" height="50px" />
          </div>
          <div class="comment-wrap">
            <div class="content">
              <span style="color: #517eaf; font-size: 14px"
                >{{ item.user.nickname }}：</span
              >
              <span style="font-size: 14px">{{ item.content }}</span>
            </div>
            <div class="re-content" v-if="item.beReplied[0]">
              <span class="name" style="color: #517eaf; font-size: 14px"
                >{{ item.beReplied[0].user.nickname }}：</span
              ><span class="comment" style="font-size: 14px">{{
                item.beReplied[0].content
              }}</span>
            </div>
            <div style="color: #bebebe; font-size: 14px">
              {{ formatData(item.time, true) }}
            </div>
          </div>
        </div>
      </div>
      <div class="comments-wrap">
        <div class="title">最新评论 ({{ mvCommentTotal }})</div>
        <div class="item" v-for="(item, index) in mvComment" :key="index">
          <div class="icon-wrap">
            <img :src="item.user.avatarUrl" alt="" height="50px" />
          </div>
          <div class="comment-wrap">
            <div class="content">
              <span style="color: #517eaf; font-size: 14px"
                >{{ item.user.nickname }}：</span
              >
              <span style="font-size: 14px">{{ item.content }}</span>
            </div>
            <div class="re-content" v-if="item.beReplied[0]">
              <span class="name" style="color: #517eaf; font-size: 14px"
                >{{ item.beReplied[0].user.nickname }}：</span
              ><span class="comment" style="font-size: 14px">{{
                item.beReplied[0].content
              }}</span>
            </div>
            <div style="color: #bebebe; font-size: 14px">
              {{ formatData(item.time, true) }}
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="mvCommentTotal"
        :page-size="5"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simimv" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" @click="mvClick(item.id)" />
              <div class="num-wrap">
                <div class="num">{{ playCount(item.playCount) }}</div>
              </div>
              <span class="time">{{ formatData(item.duration) }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMvUrl,
  getMvDetail,
  getArtistsDetail,
  getMvComment,
  getSimiMv,
} from "network/news";

export default {
  data() {
    return {
      // MVUrl
      mvurl: "",
      // Mv详情
      mvDetail: "",
      // Mv歌手
      artists: "",
      // Mv评论
      mvComment: "",
      mvHotComment: "",
      mvCommentTotal: 0,
      // 相关MV
      simimv: "",
    };
  },
  methods: {
    playCount(playCount) {
      return playCount > 10000 ? parseInt(playCount / 10000) + "万" : playCount;
    },
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
    handleCurrentChange(val) {
      this.page = val;
      getMvComment(this.mvDetail.id, 5, (this.page - 1) * 5).then((res) => {
        this.mvComment = res.data.comments;
      });
    },
    mvClick(id) {
      this.request(id);
    },

    request(id) {
      getMvDetail(id).then((res) => {
        this.mvDetail = res.data.data;
        getArtistsDetail(res.data.data.artists[0].id).then((res) => {
          this.artists = res.data.artist;
        });
        getMvComment(id, 5).then((res) => {
          this.mvComment = res.data.comments;
          this.mvHotComment = res.data.hotComments;
          this.mvCommentTotal = res.data.total;
        });
      });
      getMvUrl(id).then((res) => {
        this.mvurl = res.data.data.url;
      });
      getSimiMv(id).then((res) => {
        this.simimv = res.data.mvs;
      });
    },
  },
  created() {
    this.request(this.$route.query.id);
  },
  mounted() {
    document.getElementById("video").volume = 0.4;
  },
};
</script>

<style>
.mvdetails {
  display: flex;
}
.mvdetails .title {
  margin-bottom: 20px;
}
.mvdetails .mv-wrap .video-wrap {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
}
.mvdetails .mv-wrap .video-wrap video {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  outline: none;
}
.mvdetails .mv-wrap .info-wrap {
  margin-bottom: 50px;
}
.mvdetails .mv-wrap .info-wrap .singer-info {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}

.mvdetails .mv-wrap .info-wrap .singer-info .cover-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
}
.mvdetails .mv-wrap .info-wrap .singer-info .cover-wrap img {
  width: 100%;
  height: 100%;
}
.mvdetails .mv-wrap {
  width: 700px;
  margin-right: 35px;
}
.mvdetails .mv-wrap .mv-wrap .title {
  font-size: 30px;
}
.mvdetails .mv-wrap .date,
.mvdetails .mv-wrap .number {
  color: #bebebe;
  font-size: 14px;
}
.mvdetails .mv-wrap .date {
  margin-right: 25px;
}
.mvdetails .mv-wrap .info-wrap .mv-info .desc {
  font-size: 15px;
  margin-top: 20px;
}

.mv-wrap .comments-wrap {
  margin-bottom: 70px;
}

.mv-wrap .comments-wrap .item {
  display: flex;
  padding-top: 20px;
}
.mv-wrap .comments-wrap .icon-wrap {
  margin-right: 15px;
}
.mv-wrap .comments-wrap .icon-wrap img {
  border-radius: 50%;
}
.mv-wrap .comments-wrap .content {
  margin-bottom: 10px;
}
.mv-wrap .comments-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}

.el-pagination {
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
}

.mv-recommend {
  flex: 1;
}
.mv-recommend .mvs .items {
  display: flex;
  flex-wrap: wrap;
}

.mv-recommend .mvs .items .item {
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 0px;
  cursor: pointer;
}

.mv-recommend .mvs .items .item .img-wrap {
  position: relative;
  margin-right: 10px;
}
.mv-recommend .mvs .items .item .img-wrap img {
  width: 180px;
  border-radius: 5px;
}
.mv-recommend .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: #fff;
  top: 0;
  right: 0px;
  display: flex;
  -ms-flex-line-pack: center;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}
.mv-recommend .mvs .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff;
  font-size: 15px;
}
.mv-recommend .mvs .items .item .info-wrap {
  flex: 1;
}
.mv-recommend .mvs .items .item .info-wrap .name {
  font-size: 15px;
}
.mv-recommend .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>