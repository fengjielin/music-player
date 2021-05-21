<template>
  <div class="new-mvs">
    <div class="filter-wrap">
      <div class="section-wrap">
        <span class="section-type">地区:</span>
        <tab-bar-2
          @setTag="setTagSection"
          :tagList="sections"
          :tag="section"
        ></tab-bar-2>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <tab-bar-2
          @setTag="setTagType"
          :tagList="types"
          :tag="type"
        ></tab-bar-2>
      </div>
      <div class="order-wrap">
        <span class="order-type">地区:</span>
        <tab-bar-2
          @setTag="setTagOrder"
          :tagList="orders"
          :tag="order"
        ></tab-bar-2>
      </div>
    </div>
    <div class="mvs">
      <recommend-mvs-items :recommendMvs="newsMvsData"></recommend-mvs-items>
      <pagination
        @getPaging="getPaging"
        :total="newsMvsCount"
        :tag="tag"
        :pageSize = 12
      ></pagination>
    </div>
  </div>
</template>

<script>
import { getNewsMvs } from "network/news";

import TabBar2 from "components/tabbar/TabBar2.vue";
import RecommendMvsItems from "components/mvs/recommendMvsItems.vue";
import pagination from "components/pagination/pagination.vue";

export default {
  data() {
    return {
      sections: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      section: "全部",
      types: ["全部", "官方版", "原声", "现场版", "网易出品"],
      type: "全部",
      orders: ["上升最快", "最热", "最新"],
      order: "上升最快",

      // tag:用于当tabbar发生改变是控制页码回到第一页
      tag: "",

      // 存放最新mv的数据
      newsMvsData: [],
      // 多少条数据
      newsMvsCount: 1000,

      page: 1,
    };
  },
  components: {
    TabBar2,
    RecommendMvsItems,
    pagination,
  },
  methods: {
    /* 切换tabbar的标签 */
    setTagSection(item) {
      this.section = item;
      this.tag = item;
      this.request().newsMvs();
    },
    setTagType(item) {
      this.type = item;
      this.tag = item;
      this.request().newsMvs();
    },
    setTagOrder(item) {
      this.order = item;
      this.tag = item;
      this.request().newsMvs();
    },

    /* 切换页码 */
    getPaging(page) {
      this.page = page;
      this.request().newsMvs();
    },
    
    request() {
      return {
        newsMvs: () => {
          /* 请求最新MV的mv数据 */
          getNewsMvs(
            this.section,
            this.type,
            this.order,
            12,
            (this.page - 1) * 12
          ).then((res) => {
            this.newsMvsData = res.data.data;
            // 切换页码时，会出现请求回来的数据没有count这个属性
            // this.newsMvsCount = res.data.count;
          });
        },
      };
    },
  },
  created() {
    this.request().newsMvs();
  },
};
</script>

<style>
.new-mvs {
  padding-top: 20px;
}
.filter-wrap .section-wrap,
.filter-wrap .type-wrap,
.filter-wrap .order-wrap {
  display: flex;
  margin-bottom: 30px;
}
</style>