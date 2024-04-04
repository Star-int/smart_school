<template>
  <div class="student-list">
    <h1>学生列表</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="学生姓名">
        <el-input v-model="searchObj.studentName" placeholder="学生姓名" />
      </el-form-item>

      <el-form-item label="学生学号">
        <el-input v-model="searchObj.studentId" placeholder="学生学号" />
      </el-form-item>

      <el-form-item label="学生专业">
        <el-input v-model="searchObj.major" placeholder="学生班级专业" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--表格-->
    <router-link :to="'/application/studentsave'">
      <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;">添加学生信息</el-button>
    </router-link>

    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    <el-table :data="studentList" style="width: 100%"    @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生姓名" width="100" prop="studentName">
        <template slot-scope="scope">
          <span>{{ scope.row.studentName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生学号" width="130" prop="studentId">
        <template slot-scope="scope">
          <span>{{ scope.row.studentId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生专业" width="100px" prop="major">
        <template slot-scope="scope">
          <span>{{ scope.row.major }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学校" width="200" prop="schoolName">
        <template slot-scope="scope">
          <span>
            <i class="el-icon-school"></i>
            {{ scope.row.schoolName }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/application/studentedit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
import student from "@/api/application/student";

export default {
  data() {
    return {
      selectedStudents: [], // 存储用户选择的学生
      studentList: [], // 存储学生列表数据
      searchObj: {
        studentName: "", // 学生姓名查询条件
        studentId: "", // 学生学号查询条件
        major: "" // 学生专业查询条件
      }, // 存储查询条件对象
      page: 1, // 当前页码数，默认为第一页
      limit: 10, // 每页显示的条数，默认为10条数据
      total: 0 // 总记录数，默认为0条数据，后续从后端获取
    };
  },

  created() {
    // 页面加载时执行的函数，用于初始化数据和调用后端接口获取学生列表数据。
    this.fetchData();
  },
  methods: {
    // 定义方法，用于调用后端接口获取学生列表数据。
    fetchData(page = 1) {
      // 调用后端接口获取学生列表数据的方法。
      this.page = page;
      student
        .getStudentPage(this.page, this.limit,this.searchObj)
        .then(response => {
          // 调用后端接口获取学生列表数据的方法。
          console.log(JSON.stringify(this.searchObj))
          this.studentList = response.data.items.records; // 将后端返回的学生列表数据存储到list变量中。
          this.total = response.data.items.total; // 将后端返回的总记录数存储到total变量中。
        });
    },

    // 定义方法，用于重置查询条件。
    resetData() {
      this.searchObj = {
        studentName: "", // 学生姓名查询条件
        studentId: "", // 学生学号查询条件
        major: "" // 学生专业查询条件
      };
      this.fetchData(); // 调用fetchData方法，重新获取学生列表数据。
    },

    handleSelectionChange(selection) {
      this.selectedStudents = selection;
    },

    handleBatchDelete() {
      if (this.selectedStudents.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }

      this.$confirm("此操作将永久删除这些信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const selectedIds = this.selectedStudents.map(item => item.id);
        
        student
          .deteleStudentBrach(selectedIds)
          .then(response => {
            this.fetchData(); // 重新加载数据列表
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          });
      });
    },

    handleDelete(id){

        this.$confirm("此操作将永久删除该兼职信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        student.deteleStudent(id).then(response=>{
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.fetchData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })

        
    }
  }
};
</script>

<style>
</style>