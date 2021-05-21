<template>
  <div class="comments-wrap">
    <div class="title" v-if="!total">热门评论 ({{ comments.length }})</div>
    <div class="item" v-for="(item, index) in comments" :key="index">
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
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
    },
    total: {
      type: Number,
    },
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
  },
};
</script>

<style>
.comments-wrap {
  margin-bottom: 70px;
}

.comments-wrap .item {
  display: flex;
  padding-top: 20px;
}
.comments-wrap .icon-wrap {
  margin-right: 15px;
}
.comments-wrap .icon-wrap img {
  border-radius: 50%;
}
.comments-wrap .content {
  margin-bottom: 10px;
}
.comments-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
</style>