<template>
  <div id="app">
    <top>
      <search path="/search"></search>
    </top>
    <div class="content">
      <side-nav></side-nav>
      <main-content>
        <router-view></router-view>
      </main-content>
    </div>
    <bottom>
      <player></player>
    </bottom>
  </div>
</template>

<script>
import Top from "views/top/Top";
import SideNav from "views/contents/side-nav/SideNav";
import MainContent from "views/contents/main-content/MainContent";
import Bottom from "views/bottom/Bottom";

import Player from "components/player/Player";
import Search from "components/search/Search";

export default {
  data(){
    return {

    }
  },
  components: {
    Top,
    SideNav,
    MainContent,
    Bottom,
    Player,
    Search
  },
};
</script>

<style>
/* 初始化样式 */
@import url("assets/css/base.css");

* {
  box-sizing: border-box;
  transition: .5s;
}

body{
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

/* 顶部 */
#app > .top {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #008c8c;
  box-sizing: border-box;
  padding: 5px 0;
  text-align: center;
}

#app > .top .search {
  margin-top: 9px;
}

/* 内容 */
#app > .content {
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  height: 100vh;
}

#app > .content .side-nav{
  width: 200px;
  height: 100%;
  background-color: #ededed;
  text-align: center;
}

#app > .content .main-content{
  flex: 1;
  padding: 10px 20px;
  overflow-y: scroll;
}

#app > .content .main-content>div{
  margin: 0 auto;
  max-width: 1100px;
}

/* 底部 */
#app > .bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f1f3f4;
}

</style>
