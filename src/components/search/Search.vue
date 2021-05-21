<template>
  <div class="search">
    <input
      type="text"
      name=""
      id=""
      placeholder="Search"
      @keydown.enter="enterClick"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "/search",
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    /* 防抖函数 */
    debounce(func, wait) {
      let timeout;
      return function () {
        if (timeout) clearTimeout(timeout);
        let callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait);
        if (callNow) func.apply(this, arguments);
      };
    },
 
    enterClick() {
      if (this.inputValue == "") {
        alert("请输入关键字！！");
      } else {
        this.$router.push({
          path: this.path,
          query: { keywords: this.inputValue },
        });

      }
    },
  },
};
</script>

<style>
.search > input {
  height: 32px;
  line-height: 32px;
  padding-left: 30px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  font-size: 13px;
  color: #606266;
  display: inline-block;
  outline: 0;
  padding: 0 15px;
}
</style>