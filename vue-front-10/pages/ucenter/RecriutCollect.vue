<template>
  <div class="page-container">
    <h1>我的岗位收藏</h1>

    <el-table :data="list" border fit highlight-current-row row-class-name="myClassList">
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="公司图片" width="200" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <router-link :to="'/recuit/'+scope.row.id">
                <img :src="scope.row.companyLogo" alt="scope.row.title" width="150px" />
              </router-link>
            </div>
      
          </div>
        </template>
      </el-table-column>

      <el-table-column label="岗位" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工资" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.salary }}</span>
        </template>
      </el-table-column>

      

  

      <el-table-column label="公司名称" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>

    
      <el-table-column label="招聘状态" width="100" height="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color: green;">招聘中</span>
          <span v-else style="color: red;">招聘完</span>
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
import recuit from "@/api/recuit";
import collect from "@/api/collect";
import cookie from "js-cookie";

export default {
  data() {
    return {
      list: [], // 课程列表
      user: {}, // 用户信息
      collectInfo: {},
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

      recuit
        .getCollectRecruit(this.page, this.limit, this.user.id)
        .then(response => {
          this.list = response.data.data.items.records; // 课程列表
          this.total = response.data.data.items.total;
          console.log(JSON.stringify(this.list))
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
      this.collectInfo.recruitmentId = id;
      this.collectInfo.userId = this.user.id;
      collect
        .deleteCollect(this.collectInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "取消收藏成功"
          });
          this.fetchData(this.page, this.limit, this.user.id); // 重新加载课程列表
        })
        .catch(error => {
          // 取消收藏失败时的处理逻辑
          console.error(error); // 打印错误信息到控制台
          this.$message({
            // 显示错误提示消息框
            type: "error",
            message: "取消收藏失败" // 提示消息内容
          });
        });
    }
  }
};
</script>