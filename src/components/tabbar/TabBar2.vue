<template>
  <div class="tab-wrap">
    <span
      class="item"
      v-for="(item, index) in tagList"
      :key="index"
      :class="{ actived: tag == item }"
      @click="setTag(item)"
      >{{ item }}</span>
  </div>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
    },
    tag: {
      type: String,
    },
  },
  methods: {
    setTag(item) {
      this.$emit("setTag", item);
    },
  },
};
</script>

<style>
.actived {
  color: #dd6d60 !important;
  background-color: #fcf6f5;
  border-radius: 20px;
}

.tab-wrap .item{
  margin: 20px;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 14px;
}
</style>