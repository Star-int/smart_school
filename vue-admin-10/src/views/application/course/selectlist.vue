<template>
  <div>
    <h1>编辑相应学生的选课信息</h1>
    
    <el-button type="success" size="mini" icon="el-icon-plus" @click="dialogVisible=true" style="height: 42px;">添加选课</el-button>
  

    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    <router-link :to="'/application/courselist'">
      <el-button type="primary" size="mini" style="height: 42px;">返回</el-button>
    </router-link>

    <el-table
      :data="SelectionsList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程名称" width="300" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.courseName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title :visible.sync="dialogVisible" width="30%">
     <el-form ref="courseForm" :model="selectionCourse" label-width="80px">
    
    
     <el-form-item label="课程id"  >
        <el-input v-model="selectionCourse.courseId" style="width: 180px;" disabled></el-input>
      </el-form-item>
    
      <el-form-item label="课程名称">
      <el-select v-model="selectionCourse.courseName" placeholder="请选择课程名称"   @change="handleCourseChange" filterable>
        <el-option
          v-for="course in filteredCourseList"
          :key="course.id"
          :label="course.title"
          :value="course.title"
          
        ></el-option>
      </el-select>
      </el-form-item>
      
      <div style="margin-left:200px ;">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleAdd">确定</el-button>
      </div>
      </el-form>
    </el-dialog>

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
import select from "@/api/application/select";
import course from "@/api/edu/course";

export default {
  data() {
    return {
      dialogVisible:false,
      selectionCourse:{},
      SelectionsList: [],
      courseList: [],
      selectedCourse: [],
      page: 1, // 当前页码数，默认为第一页
      limit: 10, // 每页显示的条数，默认为10条数据
      total: 0, // 总记录数，默认为0条数据，后续从后端获取
      studentId: ""
    };
  },

  created() {
    //页面加载就调用该方法，获取数据列表
    this.studentId = this.$route.params.id; //获取学生id，从路由参数中获取。
    console.log("学生id是：" + this.studentId); //测试代码，确保获取到了学生id。

    this.fetchData();
  },

  computed: {
    filteredCourseList() {
      // 过滤已经选择的课程
      return this.courseList.filter(course => !this.isCourseSelected(course.title));
    }
  },

  methods: {
    fetchData(page = 1) {
      this.page = page;
      select
        .getSelectionPage(this.page, this.limit, this.studentId)
        .then(response => {
          this.SelectionsList = response.data.items.records; // 获取数据列表，这里假设后端返回的数据格式为{ records: [] }，其中records为数据列表数组。
          this.total = response.data.items.total;
        });

      course.getAllCourse().then(response => {
        this.courseList = response.data.list; // 获取数据列表，这里假设后端返回的数据格式为{ records: [] }，其中records为数据列表数组。
      });
    }, //获取数据列表的方法，需要根据实际情况实现。
    
    handleAdd(){
        this.selectionCourse.studentId=this.studentId; //将学生id添加到选课信息中。
    
        select.addSelection(this.selectionCourse).then(response=>{
            this.fetchData(this.page); // 重新加载数据列表。
            this.dialogVisible=false; //关闭对话框。
            this.$message({
                type: 'success',
                message: '添加成功!'
            })
            
        })
    },

    handleCourseChange() {
      // 根据选中的课程名称查找对应的课程对象
      const Coursethis = this.courseList.find(course => course.title === this.selectionCourse.courseName);
   
      if ( Coursethis ) {
        this.selectionCourse.courseId = Coursethis.id; // 将选中的课程的 ID 设置到表单数据中
        console.log("选中的课程ID是：" + this.selectionCourse.courseId); // 测试代码，确保获取到了课程ID。
      }
    },

    isCourseSelected(courseName) {
    return this.SelectionsList.some(selection => selection.courseName === courseName);
  },

    handleSelectionChange(selection) {
      this.selectedCourse = selection;
    },

    handleBatchDelete() {
      if (this.selectedCourse.length === 0) {
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
        const selectedIds = this.selectedCourse.map(item => item.id);
        
        select
          .deleteBrach(selectedIds)
          .then(response => {
            this.fetchData(this.page); // 重新加载数据列表
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

    handleDelete(id) {

        this.$confirm("此操作将永久删除这些信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        select.deteleSelection(id).then(response=>{
            this.fetchData(this.page); // 重新加载数据列表。
            this.$message({
                  type: 'success',
                  message: '删除成功!'
            })
            }).catch(error=>{
                this.$message({
                
                    type: 'error',
                    message: '删除失败!'
                })
            })
          
      })

        
    },



}
};
</script>

<style scoped>
</style>