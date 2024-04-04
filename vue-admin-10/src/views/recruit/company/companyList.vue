<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="公司名称">
        <el-input v-model="searchObj.name" placeholder="公司名称" />
      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="searchObj.address" placeholder="公司地址" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      
    </el-form>
    <!--表格-->
    <router-link :to="'/recruitment/csave'">
        <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;">添加公司信息</el-button>
      </router-link>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
   
    <el-table :data="companyList" style="width: 100%"  @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司 Logo" width="200" prop="logo">
        <template slot-scope="scope">
          <img :src="scope.row.logo" style="height: 100px; width: 100%;object-fit: cover;" />
        </template>
      </el-table-column>

      <el-table-column label="公司名称" width="100" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      

      <el-table-column label="公司地址" width="300px" prop="address">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司官网" width="180" prop="website">
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/recruitment/cedit/'+scope.row.id">
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

import company from "@/api/recruit/company";


export default {
  data() {
    return {
      selectedCompanys:[],
      companyList: [], //数据列表
      recruitmList:{},
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
      company
        .getPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.companyList = response.data.items.records; //获取数据列表
          this.total = response.data.items.total;
          console.log(JSON.stringify(this.companyList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
        });
    },

    resetData() {
      this.searchObj = {}; //重置查询条件对象为空，以清空查询条件
      this.fetchData(); //重新加载数据列表，以显示所有数据。
    },

    handleSelectionChange(selection) {
      this.selectedCompanys = selection;
    },

    handleBatchDelete() {
      if (this.selectedCompanys.length === 0) {
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
        const selectedIds = this.selectedCompanys.map(item => item.id);
        
        company
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

    handleDelete(id) {
      this.$confirm("此操作将永久删除该兼职信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            company.deleteCompanyInfo(id);
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
    
  