<template>
  <table class="el-table">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
    </thead>
    <tbody v-if="tag">
      <tr
        class="el-table__row"
        v-for="(item, index) in newsSongsData"
        :key="index"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <img
            v-if="item.album.picUrl"
            class="songImg"
            :src="item.album.picUrl"
            alt=""
            @click="playClick(item.id)"
          />
          <img
            v-else
            class="songImg"
            :src="item.album.artist.img1v1Url"
            alt=""
            @click="playClick(item.id)"
          />
        </td>
        <td @click="playClick(item.id)">{{ item.name }}</td>
        <td>{{ item.artists[0].name }}</td>
        <td>{{ item.album.name }}</td>
        <td>{{ formatData(item.duration, false) }}</td>
      </tr>
    </tbody>
    
    <tbody v-else>
      <tr
        class="el-table__row"
        v-for="(item, index) in newsSongsData"
        :key="index"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <img
            class="songImg"
            :src="item.al.picUrl"
            alt=""
            height="70px"
            width="70px"
            @click="playClick(item.id)"
          />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.ar[0].name }}</td>
        <td>{{ item.al.name }}</td>
        <td>{{ formatData(item.dt, false) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    newsSongsData: {
      type: Array,
    },
    tag:{
      type:Boolean
    }
  },
  methods: {
    /* 时间格式化 */
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

    /* 点击播放音乐 使用事件总线*/
    playClick(id) {
      this.$emit("a", id);
    },
  },
};
</script>

<style>
.el-table .songImg {
  margin: 2px 35px;
  cursor: pointer;
  height: 70px;
  width: 70px;
}
</style>