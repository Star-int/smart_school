<template>
    <div class="app-container">
   
      <el-tabs v-model="activeName" @tab-click="handleClick" >
         
        <el-tab-pane label="学生认证" name="学生认证">
          <define  class="define" />
        </el-tab-pane>
        <el-tab-pane label="请假中心" name="请假中心">
        <leave-Page class="leavePage" />
        </el-tab-pane>
        <el-tab-pane  label="选课中心" name="选课中心">
          <selectcourse  class="selectcourse" />
      
        </el-tab-pane>
        
      </el-tabs>
    </div>
</template>

<script>
import define from "../ucenter/appStudent.vue";
import selectcourse from "../ucenter/appSelectCourse.vue";
import leavePage from"../ucenter/appLeave.vue";




export default {
    components: {  define ,selectcourse,leavePage },
  data() {
    return {
      activeName: "学生认证"
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