<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作类型">
        <el-input v-model="searchObj.type" placeholder="什么类型" />
      </el-form-item>

      <el-form-item label="工资">
        <el-input v-model="searchObj.salary" placeholder="工资要求多少/小时" />
      </el-form-item>

      <el-form-item label="工作地点">
        <el-input v-model="searchObj.workplace" placeholder />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
     
    </el-form>
    <router-link :to="'/recruitment/psave'">
            <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;"> 添加兼职信息</el-button>
      </router-link>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
   
    <!--表格-->
    <el-table :data="parttimeList" style="width: 100%"   @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工作图片" width="200" heght="50">
        <template slot-scope="scope">
          <img
            :src="scope.row.cover"
            style="height: 100px; width: 100%;object-fit: cover;"
          />

          <!-- <img src="@/static/img/recruit/parttime/fanyi.jpeg" style="height: 200px; width: 100%;object-fit: cover;"/> -->
        </template>
      </el-table-column>

      <el-table-column label="兼职类型" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>兼职类型: {{ scope.row.type }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="工资" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.salary }}元/小时</span>
        </template>
      </el-table-column>

      <el-table-column label="工作地点" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.workplace }}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.workTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <router-link :to="'/recruitment/pedit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
import parttime from "@/api/recruit/parttime";


export default {
  data() {
    return {
      selectedPartimeJobs: [],
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      parttimeList: [], // 兼职列表数据\
      page: 1,
      limit: 5,
      total: "", // 总记录数
      searchObj: {
        type: "",
        salary: "",
        workplace: ""
      }
    };
  }, // 省略其他代码

  created() {
    this.fetchData(); // 调用方法获取兼职列表数据
  }, // 省略其他代码

  methods: {

    fetchData(page = 1) {
      this.page = page;
      parttime.getPage(this.page, this.limit, this.searchObj).then(response => {
        // 调用后端接口获取兼职列表数据，假设接口返回的数据格式为 { items: [] }，其中 items 是兼职列表数据数组。
        this.parttimeList = response.data.items.records; // 将获取到的数据赋值给 parttimeList 变量。
        this.total = response.data.items.total; // 更新总记录数。
        console.log("aaaaaaaaaaaaa" + JSON.stringify(this.searchObj)); // 打印获取到的数据
      });

    },

  

    resetData() {
      this.searchObj = { type: "",
        salary: "",
        workplace: ""};
      this.fetchData(1);
    }, //重置

   
    handleSelectionChange(selection) {
      this. selectedPartimeJobs = selection;
    },

    handleBatchDelete() {
      if (this. selectedPartimeJobs.length === 0) {
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
        const selectedIds = this. selectedPartimeJobs.map(item => item.id);
        
        parttime
          .deleteBrach(selectedIds)
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

 

    //删除兼职信息
    handleDelete(id){

      this.$confirm(
        "此操作将永久删除该兼职信息，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        parttime.deleteParttimeInfo(id)
      })
      .then(response=>{
        this.fetchData(); // 重新加载数据列表

        this.$message({
          type: 'success',
          message: '删除成功!'
          
        });
      }).catch(error=>{
        this.$message({
          type: 'error',
          message: '删除失败!'
        });
      })
    },

    
     

  }
};
</script>
  


