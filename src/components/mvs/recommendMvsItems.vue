<template>
  <div class="rec-mv-items">
    <recommend-mvs-item
      v-for="(item, index) in recommendMvs"
      :key="index"
      :recommendMvsItem="item"
      @click.native="mvDetail(item.id)"
    ></recommend-mvs-item>
  </div>
</template>

<script>
import RecommendMvsItem from "components/mvs/recommendMvsItem.vue";
export default {
  components: {
    RecommendMvsItem,
  },
  props:{
    recommendMvs:{
      type: Array
    }
  },
  methods:{
    mvDetail(id) {
      this.$router.push({
        path: "/mvDetail",
        query: { id: id },
      });
    },
  }
};
</script>

<style>
.rec-mv-items {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>