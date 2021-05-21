<template>
  <div class="tab-bar">
    <span
      class="item"
      v-for="(item, index) in tagList"
      :key="index"
      :class="{ actived: tag == item }"
      @click="setTag(item)"
      >{{ item }}</span
    >
  </div>
</template>

<script>
export default {
  props:{
    tagList:{
      type: Array
    },
    tag:{
      type:String
    }
  },
  methods:{
    setTag(item){
      this.$emit("setTag",item);
    }
  }
};
</script>

<style>
.actived {
  color: #dd6d60 !important;
}

.tab-bar {
  display: flex;
  justify-content: flex-end;
}
.tab-bar .item {
  margin-right: 20px;
  font-size: 15px;
  color: gray;
  cursor: pointer;
}
</style>