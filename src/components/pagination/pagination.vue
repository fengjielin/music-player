<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="page"
    :page-size="pageSize"
  >
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
  props: {
    total: {
      type: Number,
    },
    tag: {
      type: String,
    },
    pageSize:{
      type: Number
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.page = val;
      this.$emit("getPaging", this.page);
    },
  },
  watch: {
    tag() {
      this.page = 1;
    },
  },
};
</script>

<style>
.el-pagination {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>