<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <router-link :to="'/teacher/save'">
      <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;">添加老师</el-button>
    </router-link>
    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >

       <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="头像" width="200" heght="50">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 100px; width: 100%;object-fit: cover;" />

          <!-- <img src="@/static/img/recruit/parttime/fanyi.jpeg" style="height: 200px; width: 100%;object-fit: cover;"/> -->
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">{{ scope.row.level===1?'高级讲师':'首席讲师' }}</template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160">
        <template slot-scope="scope">{{ formatTime(scope.row.gmtCreate) }}</template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
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
      @current-change="getList"
    />
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import dayjs from "dayjs";

export default {
  data() {
    // 定义数据
    return {
      selectedTeachers:[],
      listLoading: false, // 设置加载标识
      list: null, // 查询之后接口返回的集合
      total: 0, // 总记录数
      page: 1, // 当前页
      limit: 6, // 每页显示记录数
      teacherQuery: {} // 条件封装对象
    };
  },

  created() {
    // 当页面加载时获取数据
    // this.fetchData()
    this.getList();
  },

  methods: {
    // fetchData() { // 调用api层获取数据库中的数据
    //   console.log('加载列表')
    // },
    formatTime(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },

    getList(page = 1) {
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          // console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list);
          console.log(this.total);
          console.log(this.teacherQuery.name);
        }) //请求成功
        .catch(error => {
          console.log(error);
        }); //请求失败
    },

    resetData() {
      // 清空的方法
      // 表单输入项数据清空
      this.teacherQuery = {};
      // 查询所有讲师数据
      this.getList();
    },

    handleSelectionChange(selection) {
      this.selectedTeachers = selection;
    },

    handleBatchDelete() {
      if (this.selectedTeachers.length === 0) {
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
        const selectedIds = this.selectedTeachers.map(item => item.id);
        teacher.removeBrach(selectedIds).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList(this.page);
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        })
      
        
    
    },

    removeDataById(id) {
      // debugger
      // console.log(memberId)
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return teacher.removeById(id);
        })
        .then(() => {
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    }
  }
};
</script>