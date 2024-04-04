<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item label="工作岗位">
        <el-input v-model="searchObj.postitionName" placeholder="什么类型" />
      </el-form-item>

      <el-form-item label="工作地点">
        <el-input v-model="searchObj.location" placeholder />
      </el-form-item>


      <el-form-item label="公司">
        <el-select
          v-model="searchObj.companyName"
          style="width: 200px"
          placeholder="请选择公司"
         
          filterable
        >
          <el-option
            v-for="item in companylist"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学历要求">
        <el-select v-model="searchObj.education" placeholder="请选择" style="width: 90px;">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
     
    </el-form>
    <router-link :to="'/recruitment/rsave'">
        <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;">添加招聘信息</el-button>
      </router-link>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
   
    <!--表格-->
    <el-table :data="recruitmentList" style="width: 100%"  @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
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

      <el-table-column label="学历要求" width="100" heght="50">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.education }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="经验要求" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.experience }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司名称" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司位置" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="招聘状态" width="100" height="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color: green;">招聘中</span>
          <span v-else style="color: red;">招聘完</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/recruitment/redit/'+scope.row.id">
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
import recruitment from "@/api/recruit/recruitment";
import company  from "@/api/recruit/company";

export default {
  data() {
    return {
      selectedRecruitments:[],
      recruitmentList: [], //数据列表
      companylist:{},
      searchObj: {}, //查询条件对象
      page: 1, //当前页码
      limit: 6, //每页记录数
      total: "" //总记录数
    };
  },

  created() {
    //页面加载就调用该方法，获取数据列表

    this.fetchData();
  },

  methods: {
    fetchData(page = 1) {
      this.page = page;
      console.log(this.page); //打印当前页码到控制台
      console.log(this.limit); //打印查询条件到控制台
      recruitment
        .getPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.recruitmentList = response.data.items.records; //获取数据列表
          this.total = response.data.items.total;
          console.log(JSON.stringify(this.recruitmentList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
        });

        company.getCompanyList().then(response =>{
          this.companylist=response.data.items

        })
      
    },

    resetData() {
      this.searchObj = {}; //重置查询条件对象为空，以清空查询条件
      this.fetchData(); //重新加载数据列表，以显示所有数据。
    },


    handleSelectionChange(selection) {
      this.selectedRecruitments = selection;
    },

    handleBatchDelete() {
      if (this.selectedRecruitments.length === 0) {
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
        const selectedIds = this.selectedRecruitments.map(item => item.id);
        
        recruitment
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
      this.$confirm("此操作将永久删除该兼职信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          recruitment.deleteRecruitInfo(id);
        })
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
    }
  }
};
</script>
  
