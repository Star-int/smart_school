<template>
  <div class="app-container">
 
    <el-tabs v-model="activeName" @tab-click="handleClick" >
       
      <el-tab-pane label="课程收藏" name="课程收藏">
        <course-page  class="course-collect" />
      </el-tab-pane>
      <el-tab-pane label="岗位收藏" name="岗位收藏">
        <recruit-collect  class="recruit-collect" />
      </el-tab-pane>
      <el-tab-pane  label="商品收藏" name="商品收藏">
        <goods-collect class="goods-collect" />
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>
  
<script>
import CoursePage from "../ucenter/CourseCollect.vue";
import RecruitCollect from "../ucenter/RecriutCollect.vue";
import GoodsCollect from "../ucenter/GoodsCollect.vue";


export default {
    components: { CoursePage, RecruitCollect, GoodsCollect },
  data() {
    return {
      activeName: "课程收藏"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
  
<style scoped>
.app-container {
  margin-top:-60px;
}


</style>