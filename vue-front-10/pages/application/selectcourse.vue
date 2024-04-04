<template>
  <div>
    <h1>选课中心</h1>

    <router-link :to="'/application/application'">
      <el-button type="primary" size="mini" style="height: 42px;">返回</el-button>
    </router-link>

    <el-table :data=" coursePageList" style="width: 100%" border>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程名称" width="300" heght="50">
        <template slot-scope="scope">
          <router-link
            :to="'/course/' + scope.row.id"
            style="text-decoration: none; color: #409EFF;"
          >{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>

      <el-table-column label="课程图片" width="300" heght="50">
        <template slot-scope="scope">
          <router-link
            :to="'/course/' + scope.row.id"
            style="text-decoration: none; color: #409EFF;"
          >
            <img :src="scope.row.cover" alt="课程图片" width="100%" height="100%" />
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="发布时间" width="300" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleAdd(scope.row.id,scope.row.title)">选择该课</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="parseInt(total)"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
  
<script>
import select from "@/api/select";
import course from "@/api/course";
import student from "@/api/student";
import cookie from "js-cookie";

export default {
  data() {
    return {
      user: {},

      selectionCourse: {},
      SelectionsList: [],
      courseList: [],
      coursePageList: [],

      page: 1, // 当前页码数，默认为第一页
      limit: 6, // 每页显示的条数，默认为10条数据
      total: 0, // 总记录数，默认为0条数据，后续从后端获取
      studentId: "",
      searchObj: {}
    };
  },

  created() {
    //页面加载就调用该方法，获取数据列表

    this.fetchData();
  },

  computed: {
    filteredCourseList() {
      // 过滤已经选择的课程
      return this.courseList.filter(
        course => !this.isCourseSelected(course.title)
      );
    }
  },

  methods: {
    fetchData(page = 1) {
      this.getUserInfo(); //获取用户信息，这里假设有一个名为getUserInfo的方法。
      if(this.user.id==null){
        this.$message({type: "error", message: "请先登录"});
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行

      }
      this.page = page;

      course.getAllCourse().then(response => {
        this.courseList = response.data.data.list; // 获取数据列表，这里假设后端返回的数据格式为{ records: [] }，其中records为数据列表数组。
      });

      course
        .getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          //获取分页数据，这里假设有一个名为getPageList的方法。
          this.coursePageList = response.data.data.items; // 获取数据列表，这里假设后端返回的数据格式为{ records: [] }，其中records为数据列表数组。
          this.total = response.data.data.total; // 获取总记录数，这里假设后端返回的数据格式为{ total: 0 }，其中total为总记录数。
          console.log("课程列表为" + JSON.stringify(response.data));
          console.log("总记录数为" + this.total);
        });

      student.getStudentInfoByUserId(this.user.id).then(response => {
        this.studentId = response.data.data.items.studentId; //获取学生id，这里假设有一个名为getStudentInfoByUserId的方法。
        console.log("学生id为" + this.studentId);
        // select
        // .getSelectionPage(this.page, this.limit, this.studentId)
        // .then(response => {
        //   this.SelectionsList = response.data.data.items.records; // 获取数据列表，这里假设后端返回的数据格式为{ records: [] }，其中records为数据列表数组。
        //   this.total = response.data.data.items.total;
        // });
      });
    }, //获取数据列表的方法，需要根据实际情况实现。

    getUserInfo() {
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        try {
          this.user = JSON.parse(jsonStr);
          console.log("成功解析 JSON 数据");
        } catch (error) {
          console.error("JSON 解析失败:", error);
        }
      }
    },
    



    handleAdd(id,title) { // 添加课程的方法，需要根据实际情况实现。
      this.$confirm("是否选择该课程", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

        this.selectionCourse.courseId = id; // 设置课程id，这里假设有一个名为courseId的属性。
        this.selectionCourse.courseName = title; // 设置学生id，这里假设有一个名为studentId的属性。
        this.selectionCourse.studentId = this.studentId; // 设置学生id，这里假设有一个名为studentId的属性。
        select.addSelection(this.selectionCourse).then(response => {
          if(response.data.code == 20000){
          this.$message({ type: "success", message: "选课成功" }); // 提示信息，这里假设有一个名为message的属性。
          }
        })
        
      })
    }

  }
};
</script>
  
  <style scoped>
</style>