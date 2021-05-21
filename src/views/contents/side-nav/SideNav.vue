<template>
  <div class="side-nav">
    <ul>
      <li>
        <router-link to="/discovery">发现音乐</router-link>
      </li>
      <li>
        <router-link to="/playlists">推荐歌单</router-link>
      </li>
      <li>
        <router-link to="/newsongs">最新音乐</router-link>
      </li>
      <li>
        <router-link to="/newmvs">最新mv</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.side-nav > ul {
  list-style: none;
}
.side-nav > ul > li {
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.side-nav > ul > li:hover {
  background-color: #e7e7e7;
}
.side-nav > ul > li a {
  width: 100%;
  height: 100%;
  line-height: 60px;
}
a.router-link-active {
  color: #dd6d60;
}
</style>