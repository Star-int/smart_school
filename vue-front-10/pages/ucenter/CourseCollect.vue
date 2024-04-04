<template>
  <div class="page-container">
    <h1>我的课程收藏</h1>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <router-link :to="'/course/'+scope.row.id">
              <img
                :src="scope.row.cover"
                alt="scope.row.title"
                width="150px"
              />
              </router-link>
            </div>
            <div class="title">
              <a >{{ scope.row.title }}</a>
              <p>{{ scope.row.lessonNum }}课时</p>
            </div>
          </div>
        </template>
      </el-table-column>

     
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
     
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            style="width: 98px;"
            @click="removeDataById(scope.row.id)"
          >取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <!-- 课程列表 -->
  </div>
</template>

<script>
import course from "@/api/course";
import collect from "@/api/collect";
import cookie from "js-cookie";

export default {
  data() {
    return {
      list: [], // 课程列表
      user: {}, // 用户信息
      collectInfo:{},
      page: 1, // 当前页数
      limit: 6, // 每页数量
      total: 0 // 总数量
    };
  },

  created() {
    this.getUserInfo(); // 获取用户信息
    this.fetchData(); // 获取课程列表

  },

  methods: {
    // 获取课程列表
    fetchData(page = 1) {
     
      this.page = page;
    
      course.getCollectList(this.page, this.limit,this.user.id).then(response => {
        this.list = response.data.data.items.records; // 课程列表
        this.total = response.data.data.items.total;
      });
    },

    getUserInfo() {
      //debugger
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        try {
          this.user = JSON.parse(jsonStr);
        } catch (error) {
          console.error("JSON 解析失败:", error);
        }
      }
    },

    removeDataById(id) {
       this.collectInfo.courseId=id
       this.collectInfo.userId=this.user.id
      collect.deleteCollect(this.collectInfo).then(
        response => {
            this.$message({
              type: 'success',
              message: '取消收藏成功'
            })
          this.fetchData(this.page, this.limit, this.user.id); // 重新加载课程列表
        } ).catch(error => { // 取消收藏失败时的处理逻辑
        console.error(error); // 打印错误信息到控制台
        this.$message({ // 显示错误提示消息框
            type: 'error',  
            message: '取消收藏失败' // 提示消息内容
        })
       })
    },
    
}

};
</script>