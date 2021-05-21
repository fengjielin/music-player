<template>
  <div class="carousel">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in bannersData" :key="index">
        <img
          :src="item.imageUrl"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    bannersData:{
      type: Array
    }
  }
};
</script>

<style>
.el-carousel__item > img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>